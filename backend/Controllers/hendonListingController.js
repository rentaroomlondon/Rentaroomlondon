import Listing from "../Models/Listing.js";
import { redis } from "../utils/redis.js";

const HENDON_CACHE_KEY = "listings:hendon:v2";
const HENDON_CACHE_TTL_SECONDS = 30 * 24 * 60 * 60;

const hendonPropertyQuery = {
  status: "available",
  $or: [
    {
      "location.address": /28\s+Babington Road/i,
      "location.postcode": { $in: ["NW4 4LD", "NW4 4HE"] },
    },
    {
      "location.address": /^Babington Road/i,
      "location.postcode": "NW4 4HE",
    },
    {
      "location.address": /9\s+Kennylands Court/i,
      "location.postcode": "NW4 3LU",
    },
    {
      "location.address": /^16\s+Hendale Avenue/i,
      "location.postcode": { $in: ["NW4 4LR", "NW4 4LL"] },
    },
    {
      "location.address": /^Hendale Avenue/i,
      "location.postcode": "NW4 4LL",
    },
  ],
};

export const getHendonListings = async (_req, res) => {
  if (redis) {
    try {
      const cached = await redis.get(HENDON_CACHE_KEY);

      if (cached !== null && cached !== undefined) {
        const listings =
          typeof cached === "string" ? JSON.parse(cached) : cached;

        if (Array.isArray(listings)) {
          return res.json({
            success: true,
            source: "cache",
            listings,
          });
        }

        console.error("Hendon listing cache contained an invalid value.");
      }
    } catch (error) {
      console.error("Hendon listing cache read failed:", error.message);
    }
  } else {
    console.warn("Redis is unavailable; loading Hendon listings from MongoDB.");
  }

  try {
    const listings = await Listing.find(hendonPropertyQuery)
      .select(
        "_id slug title description images location monthlyPrice status availableImmediately availableFrom listingId roomType occupancy furnished roomLabel bathroomType billsIncluded"
      )
      .sort({ "location.address": 1, monthlyPrice: 1 })
      .lean();

    if (redis) {
      try {
        await redis.set(HENDON_CACHE_KEY, listings, {
          ex: HENDON_CACHE_TTL_SECONDS,
        });
      } catch (error) {
        console.error("Hendon listing cache write failed:", error.message);
      }
    }

    return res.json({
      success: true,
      source: "database",
      listings,
    });
  } catch (error) {
    console.error("Hendon listing query failed:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load Hendon listings.",
    });
  }
};
