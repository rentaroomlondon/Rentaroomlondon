import axios from "axios";
import { readFileSync } from "node:fs";
import slugify from "slugify";
import * as XLSX from "xlsx";
import Listing from "../Models/Listing.js";
import { clearListingCache } from "../utils/clearCache.js";

const truthy = new Set(["yes", "true", "1", "y"]);
const clean = (value) => (value == null ? "" : String(value).trim());
const bool = (value, fallback = false) => {
  if (value == null || clean(value) === "") return fallback;
  return truthy.has(clean(value).toLowerCase());
};
const number = (value) => {
  if (value == null || clean(value) === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};
const list = (value) => Array.isArray(value)
  ? value.map(clean).filter(Boolean)
  : clean(value).split(/[;,]/).map((part) => part.trim()).filter(Boolean);
const normalized = (value) => clean(value).toLowerCase().replace(/[^a-z0-9]/g, "");
const postedListings = JSON.parse(readFileSync(new URL("../data/posted-listings.json", import.meta.url), "utf8"));

function parseDate(value) {
  if (value == null || clean(value) === "") return undefined;
  // Excel dates are day counts from 1899-12-30.
  if (typeof value === "number" && value > 20000 && value < 80000) {
    return new Date(Date.UTC(1899, 11, 30) + value * 86400000);
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function makeTitle(row, city, postcode) {
  const type = clean(row.roomType).replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  const room = type ? type + " Room" : "Room";
  const location = city || postcode || "London";
  return (room + " to Rent in " + location + (postcode ? " " + postcode.toUpperCase() : ""))
    .replace(/\s+/g, " ").trim();
}

function makeDescription(row, address, city, postcode) {
  const roomType = clean(row.roomType).replaceAll("_", " ") || "room";
  const occupancy = clean(row.occupancy).toLowerCase() === "double" ? "double occupancy" : "single occupancy";
  const furnished = bool(row.furnished, true) ? "furnished" : "unfurnished";
  const roomAmenities = list(row.roomAmenities).map((item) => item.replaceAll("_", " "));
  const propertyAmenities = list(row.propertyAmenities).map((item) => item.replaceAll("_", " "));
  const billsSource = row.billsIncluded;
  const includedBills = typeof billsSource === "object" && billsSource !== null
    ? Object.entries(billsSource).filter(([, included]) => bool(included)).map(([name]) => name)
    : bool(billsSource, true) ? ["electricity", "gas", "water", "Wi-Fi"] : [];
  const billsText = includedBills.length
    ? "Bills included: " + includedBills.join(", ") + "."
    : "Bills are not marked as included; please confirm which household bills are payable.";
  const bathroom = clean(row.bathroomType) || "shared";
  const sharing = clean(row.propertySharing) || "shared";
  const price = number(row.monthlyPrice);
  const rent = price == null ? "Rent details are available on request." : "The monthly rent is \u00a3" + price + ".";
  const deposit = number(row.deposit);
  const depositText = deposit == null ? "" : " The deposit is \u00a3" + deposit + ".";
  const tenancy = number(row.minTenancy) || 6;
  const displayAddress = clean(address).replace(/^\s*\d+[A-Za-z]?\s+/, "").trim();
  const location = [displayAddress, postcode, city].filter(Boolean).join(", ");
  const propertyType = clean(row.propertyType).replaceAll("_", " ") || "shared property";
  const parking = bool(row.parkingAvailable)
    ? " Parking is available" + (clean(row.parkingType) ? " (" + clean(row.parkingType).replaceAll("_", " ") + ")" : "") + (clean(row.parkingDetails) ? ": " + clean(row.parkingDetails) : "") + "."
    : "";
  return [
    "Enjoy a " + furnished + " " + roomType + " room at " + location + ". The room is listed for " + occupancy + " in a " + propertyType + ". " + (roomAmenities.length ? "Room features include " + roomAmenities.join(", ") + "." : "No additional room amenities are specified in the listing.") + " The listing details help you understand the room setup before arranging a viewing.",
    "The property has " + (propertyAmenities.length ? propertyAmenities.join(", ") : "no additional shared amenities listed") + ". The bathroom is " + bathroom + " and the property is described as " + sharing + ". " + billsText + " Please confirm how shared spaces and facilities are used by residents.",
    rent + depositText + " The minimum tenancy is " + tenancy + " months." + parking,
    "The property address is " + location + ". Review the room and shared facilities during a viewing, and check travel routes and nearby services using the address. Contact the advertiser to ask questions or arrange a viewing, and confirm that the room details and tenancy terms meet your requirements."
  ].join("\n\n");
}
async function geocode(address, postcode, city) {
  const query = [address, postcode, city, "UK"].filter(Boolean).join(", ");
  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: { q: query, format: "jsonv2", limit: 1, countrycodes: "gb" },
      headers: { "User-Agent": "RentARoomLondonListingImporter/1.0 (listing geocoding)" },
      timeout: 12000,
    });
    const result = response.data?.[0];
    if (result && Number.isFinite(Number(result.lat)) && Number.isFinite(Number(result.lon))) {
      return { coordinates: [Number(result.lon), Number(result.lat)], precision: "address" };
    }
  } catch {
    // Try the postcode lookup below when exact address lookup is unavailable.
  }

  try {
    const response = await axios.get(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`, { timeout: 12000 });
    const result = response.data?.result;
    if (result && Number.isFinite(Number(result.latitude)) && Number.isFinite(Number(result.longitude))) {
      return { coordinates: [Number(result.longitude), Number(result.latitude)], precision: "postcode" };
    }
  } catch {
    // Return one actionable error when neither service can locate the address.
  }

  throw new Error(`Could not find coordinates for ${query} or postcode ${postcode}`);
}

function buildListing(row, coordinates) {
  const address = clean(row.propertyAddress || row.address);
  const postcode = clean(row.postcode).toUpperCase();
  const city = clean(row.city) || "London";
  const title = makeTitle(row, city, postcode);
  const availableFrom = parseDate(row.availableFrom);
  const amenities = list(row.roomAmenities);
  const propertyAmenities = list(row.propertyAmenities);
  const bills = typeof row.billsIncluded === "object" && row.billsIncluded !== null
    ? row.billsIncluded
    : { electricity: bool(row.billsIncluded, true), gas: bool(row.billsIncluded, true), water: bool(row.billsIncluded, true), wifi: bool(row.billsIncluded, true) };

  return {
    title,
    description: makeDescription(row, address, city, postcode),
    propertyType: clean(row.propertyType) || "shared_house",
    roomType: clean(row.roomType) || "single",
    occupancy: clean(row.occupancy) || "single",
    furnished: bool(row.furnished, true),
    monthlyPrice: number(row.monthlyPrice),
    deposit: number(row.deposit),
    status: clean(row.status) || "available",
    availableFrom,
    availableImmediately: bool(row.availableImmediately),
    minTenancy: number(row.minTenancy) || 6,
    floor: clean(row.floor) || undefined,
    roomLabel: clean(row.roomLabel) || undefined,
    bathroomType: clean(row.bathroomType) || "shared",
    propertySharing: clean(row.propertySharing) || "shared",
    roomAmenities: amenities,
    propertyAmenities,
    billsIncluded: bills,
    wifiSpeed: clean(row.wifiSpeed) || undefined,
    parking: {
      available: bool(row.parkingAvailable),
      type: clean(row.parkingType) || undefined,
      details: clean(row.parkingDetails) || undefined,
    },
    location: { type: "Point", coordinates, address, city, postcode },
    images: [],
    epcRating: clean(row.epcRating) || undefined,
    featured: bool(row.featured),
    slug: slugify(`${title}-${row.roomLabel || "room"}`, { lower: true, strict: true }).slice(0, 100),
    listingId: `RENTAROOMLONDON-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
  };
}

export const importListings = async (req, res) => {
  let rows = Array.isArray(req.body) ? req.body : req.body?.listings;
  if (req.file) {
    try {
      const workbook = XLSX.read(req.file.buffer, { type: "buffer", cellDates: true });
      const sheet = workbook.Sheets.Listings || workbook.Sheets[workbook.SheetNames[0]];
      rows = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: true })
        .map((row, index) => ({ ...row, rowNumber: index + 2 }));
    } catch (error) {
      return res.status(400).json({ success: false, message: `Could not read the uploaded workbook: ${error.message}` });
    }
  }
  if (!Array.isArray(rows) || rows.length === 0) {
    return res.status(400).json({ success: false, message: "Send a non-empty JSON array as the body or as { listings: [...] }." });
  }
  if (rows.length > 200) return res.status(400).json({ success: false, message: "Import up to 200 rows per request." });

  const results = [];
  const geocodeCache = new Map();
  let lastGeocodeAt = 0;
  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index] || {};
    const rowNumber = row.rowNumber || row.row || index + 2;
    if (row.post != null && !bool(row.post)) {
      skipped += 1;
      results.push({ row: rowNumber, status: "skipped", reason: "post is not yes" });
      continue;
    }

    try {
      const address = clean(row.propertyAddress || row.address);
      const postcode = clean(row.postcode).toUpperCase();
      const city = clean(row.city) || "London";
      if (!address || !postcode || !clean(row.roomLabel)) throw new Error("propertyAddress, postcode and roomLabel are required");

      const alreadyPosted = postedListings.find((posted) =>
        normalized(posted.label) === normalized(row.roomLabel) &&
        normalized(address).includes(normalized(posted.street))
      );
      if (alreadyPosted) {
        skipped += 1;
        results.push({ row: rowNumber, status: "skipped", reason: "matches one of the 28 previously posted room ads", existingListingId: alreadyPosted.id });
        continue;
      }

      const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const duplicateQuery = {
        "location.postcode": new RegExp(`^${escapeRegex(postcode)}$`, "i"),
        "location.address": new RegExp(`^${escapeRegex(address)}$`, "i"),
        $or: [
          { roomLabel: new RegExp(`^${escapeRegex(clean(row.roomLabel))}$`, "i") },
          { roomType: clean(row.roomType) || "single", monthlyPrice: number(row.monthlyPrice) },
        ],
      };
      const existing = await Listing.findOne(duplicateQuery).select("_id listingId title").lean();
      if (existing) {
        skipped += 1;
        results.push({ row: rowNumber, status: "skipped", reason: "matching postcode and roomLabel already exist", existingListingId: existing.listingId || String(existing._id) });
        continue;
      }

      const geocodeKey = `${normalized(address)}|${normalized(postcode)}|${normalized(city)}`;
      if (!geocodeCache.has(geocodeKey)) {
        const wait = Math.max(0, 1100 - (Date.now() - lastGeocodeAt));
        if (wait) await new Promise((resolve) => setTimeout(resolve, wait));
        lastGeocodeAt = Date.now();
        geocodeCache.set(geocodeKey, geocode(address, postcode, city));
      }
      const geocoded = await geocodeCache.get(geocodeKey);
      const data = buildListing(row, geocoded.coordinates);
      const baseSlug = data.slug;
      let suffix = 1;
      while (await Listing.exists({ slug: data.slug })) {
        data.slug = `${baseSlug}-${suffix}`;
        suffix += 1;
      }
      const listing = await Listing.create(data);
      created += 1;
      results.push({ row: rowNumber, status: "created", listingId: listing.listingId, slug: listing.slug, coordinates: geocoded.coordinates, geocodePrecision: geocoded.precision });
    } catch (error) {
      failed += 1;
      results.push({ row: rowNumber, status: "failed", reason: error.message });
    }
  }

  if (created) await clearListingCache();
  return res.status(failed ? 207 : 200).json({
    success: failed === 0,
    summary: { received: rows.length, created, skipped, failed },
    results,
  });
};
