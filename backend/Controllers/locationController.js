import { redis } from "../utils/redis.js";

const CACHE_TTL_SECONDS = 60 * 60 * 24 * 30;
const OUTCODE_PATTERN = /^[A-Z]{1,2}\d[A-Z]?\d?$/;
const knownOutcodeAreas = {
  B24: "Erdington",
  HA0: "Wembley",
  IG4: "Redbridge",
  RM6: "Chadwell Heath",
  RM8: "Dagenham",
  SW17: "Tooting",
  UB6: "Greenford",
};

function normalizeOutcode(value) {
  const normalized = String(value || "").toUpperCase().replace(/\s/g, "");
  if (OUTCODE_PATTERN.test(normalized)) return normalized;

  for (let splitIndex = 2; splitIndex < normalized.length; splitIndex += 1) {
    const outcode = normalized.slice(0, splitIndex);
    const inwardCode = normalized.slice(splitIndex);
    if (OUTCODE_PATTERN.test(outcode) && /^\d[A-Z]{0,2}$/.test(inwardCode)) {
      return outcode;
    }
  }
  return "";
}

async function getLocationForOutcode(outcode) {
  if (knownOutcodeAreas[outcode]) {
    return { area: knownOutcodeAreas[outcode], district: "", outcode };
  }

  const cacheKey = `locations:outcode:${outcode}`;

  if (redis) {
    try {
      const cached = await redis.get(cacheKey);
      const location = typeof cached === "string" ? JSON.parse(cached) : cached;
      if (location && typeof location.area === "string") return location;
    } catch (error) {
      console.error(`Outcode cache read failed for ${outcode}:`, error.message);
    }
  }

  const response = await fetch(`https://api.postcodes.io/outcodes/${encodeURIComponent(outcode)}`, {
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) {
    throw new Error(`Postcode lookup returned HTTP ${response.status}`);
  }

  const payload = await response.json();
  const result = payload.result;
  const area = typeof result?.admin_ward === "string" && result.admin_ward.trim()
    ? result.admin_ward.trim()
    : typeof result?.admin_district === "string" && result.admin_district.trim()
      ? result.admin_district.trim()
      : "";
  if (!area) throw new Error(`No area name was returned for ${outcode}`);

  const location = { area, district: result.admin_district || "", outcode };
  if (redis) {
    try {
      await redis.set(cacheKey, location, { ex: CACHE_TTL_SECONDS });
    } catch (error) {
      console.error(`Outcode cache write failed for ${outcode}:`, error.message);
    }
  }
  return location;
}

export async function getPostcodeAreas(req, res) {
  const outcodes = [...new Set(String(req.query.postcodes || "")
    .split(",")
    .map(normalizeOutcode)
    .filter(Boolean))].slice(0, 40);

  if (!outcodes.length) {
    return res.status(400).json({ success: false, message: "Provide at least one valid postcode district" });
  }

  const locations = {};
  const results = await Promise.all(outcodes.map(async (outcode) => {
    try {
      return [outcode, await getLocationForOutcode(outcode)];
    } catch (error) {
      console.error(`Postcode area lookup failed for ${outcode}:`, error.message);
      return null;
    }
  }));
  for (const result of results) {
    if (result) locations[result[0]] = result[1];
  }
  const errors = outcodes.filter((outcode) => !locations[outcode]);

  return res.json({ success: true, locations, unresolved: errors });
}
