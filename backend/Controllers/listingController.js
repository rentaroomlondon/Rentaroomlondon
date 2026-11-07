import Listing from "../Models/Listing.js";
import slugify from "slugify";
import { createHash } from "node:crypto";
import { redis } from "../utils/redis.js";
import { clearListingCache } from "../utils/clearCache.js";

// ============================================
// 🔥 CLEAN SEO SLUG
// ============================================
const cleanSlug = (title) => {
  return slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  })
    .replace(/pound\d+/g, "")
    .replace(/for-rent|to-rent/g, "")
    .replace(/and|or/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .split("-")
    .slice(0, 6)
    .join("-");
};

// ============================================
// 🔥 UNIQUE SLUG
// ============================================
const generateUniqueSlug = async (value, { custom = false, excludeSlug = "" } = {}) => {
  let baseSlug = custom
    ? slugify(value, { lower: true, strict: true, trim: true })
    : cleanSlug(value);

  if (!baseSlug) return "";

  let slug = baseSlug;
  let counter = 1;

  while (await Listing.findOne({
    slug: excludeSlug ? { $ne: excludeSlug } : slug,
  })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

// ============================================
// 🔥 GENERATE LISTING ID
// ============================================
const generateListingId = () => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `RENTAROOMLONDON-${random}`;
};

// ============================================
// ✅ CREATE LISTING
// ============================================
export const createListing = async (req, res) => {
  try {
    const data = { ...req.body };

    const customSlug = typeof data.slug === "string" ? data.slug.trim() : "";
    data.slug = await generateUniqueSlug(customSlug || data.title, { custom: Boolean(customSlug) });
    if (!data.slug) {
      return res.status(400).json({
        success: false,
        message: "The custom slug must contain at least one letter or number.",
      });
    }
    data.listingId = generateListingId();

    const listing = await Listing.create(data);

    await clearListingCache();

    res.status(201).json({
      success: true,
      listing,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateListing = async (req, res) => {
  try {
    const { slug } = req.params;

    let listing = await Listing.findOne({ slug });

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    const updateData = { ...req.body };
    if (Object.prototype.hasOwnProperty.call(updateData, "slug")) {
      const customSlug = typeof updateData.slug === "string" ? updateData.slug.trim() : "";
      updateData.slug = await generateUniqueSlug(customSlug || updateData.title || listing.title, {
        custom: Boolean(customSlug),
        excludeSlug: listing.slug,
      });
      if (!updateData.slug) {
        return res.status(400).json({
          success: false,
          message: "The custom slug must contain at least one letter or number.",
        });
      }
    }

    listing = await Listing.findOneAndUpdate(
      { slug },
      updateData,
      { new: true, runValidators: true }
    );

    await clearListingCache();

    res.json({
      success: true,
      listing,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// ❌ DELETE LISTING
// ============================================
export const deleteListing = async (req, res) => {
  try {
    const { slug } = req.params;

    const listing = await Listing.findOneAndDelete({ slug });

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    await clearListingCache();

    res.json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// 🔍 GET SINGLE LISTING (NO CACHE)
// ============================================
export const getListingBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const listing = await Listing.findOne({ slug });

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.json({
      success: true,
      listing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// 📦 GET ALL LISTINGS (CACHED)
// ============================================
export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find()
      .sort({ createdAt: -1 })
      .lean();

    const total = listings.length;

    return res.json({
      success: true,
      total,
      listings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Public room-directory feed: include the full catalogue so location pages can
// show every room, including rented listings, with availability shown on-card.
export const getRoomDirectoryListings = async (req, res) => {
  try {
    const roomTypes = ["single", "double", "ensuite", "ensuite_double", "studio"];
    const roomType = roomTypes.includes(req.query.roomType) ? req.query.roomType : "";
    const postcodeCodes = [...new Set(String(req.query.postcodes || "")
      .split(",")
      .map((postcode) => postcode.trim().toUpperCase())
      .filter((postcode) => /^[A-Z]{1,2}\d{1,2}[A-Z]?$/.test(postcode)))].sort();
    const requestedRegion = typeof req.query.region === "string" ? req.query.region.trim() : "";
    const supportedRegions = [
      "East London",
      "North London",
      "South London",
      "West London",
      "Central London",
      "Other locations",
    ];
    const region = supportedRegions.find((value) => value.toLowerCase() === requestedRegion.toLowerCase()) || requestedRegion;
    const area = typeof req.query.area === "string" ? req.query.area.trim().slice(0, 100) : "";
    const city = typeof req.query.city === "string" ? req.query.city.trim().slice(0, 100) : "";
    const cacheKey = `listings:directory:${createHash("sha256")
      .update(JSON.stringify({
        roomType,
        postcodes: postcodeCodes,
        region: region.toLowerCase(),
        area: area.toLowerCase(),
        city: city.toLowerCase(),
      }))
      .digest("hex")}`;

    if (redis) {
      try {
        const cached = await redis.get(cacheKey);
        const payload = typeof cached === "string" ? JSON.parse(cached) : cached;
        if (payload && Array.isArray(payload.listings)) {
          res.set("X-Cache", "HIT");
          return res.json(payload);
        }
      } catch (error) {
        console.error("Room directory cache read failed:", error.message);
      }
    }

    const query = {};
    if (roomType) query.roomType = roomType;

    if (postcodeCodes.length) {
      query.$or = postcodeCodes.map((postcode) => ({
        "location.postcode": { $regex: `^${postcode}`, $options: "i" },
      }));
    } else if (region) {
      const prefixesByRegion = {
        "East London": ["E"],
        "North London": ["N", "NW", "HA"],
        "South London": ["SE", "SW"],
        "West London": ["W"],
        "Central London": ["EC", "WC"],
      };
      const prefixes = prefixesByRegion[region];
      if (prefixes) {
        query.$or = prefixes.map((prefix) => ({
          "location.postcode": { $regex: `^${prefix}\\d`, $options: "i" },
        }));
        if (region === "Central London") {
          query.$or.push({ "location.city": /^(greater )?london$/i });
        }
      } else if (region === "Other locations") {
        query["location.city"] = { $exists: true, $not: /^(greater )?london$/i };
      }
    } else if (area) {
      const escapedArea = area.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.$or = ["location.address", "location.city", "location.postcode", "title"].map((field) => ({
        [field]: { $regex: escapedArea, $options: "i" },
      }));
    }

    if (city) {
      const escapedCity = city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query["location.city"] = { $regex: `^${escapedCity}$`, $options: "i" };
    }

    const listings = await Listing.find(query)
      .select("title description slug images location monthlyPrice availableImmediately availableFrom roomType listingId status bathroomType")
      .sort({ createdAt: -1 })
      .lean();

    const payload = { success: true, count: listings.length, listings };
    if (redis) {
      try {
        await redis.set(cacheKey, payload, { ex: 300 });
      } catch (error) {
        console.error("Room directory cache write failed:", error.message);
      }
    }
    res.set("X-Cache", "MISS");
    return res.json(payload);
  } catch (error) {
    console.error("Room directory listings error:", error.message);
    return res.status(500).json({ success: false, message: "Unable to load room listings" });
  }
};

// ============================================
// 🔍 SEARCH (NO CACHE - OPTIONAL)
// ============================================
export const searchListings = async (req, res) => {
  try {
    const {
      search,
      minPrice,
      maxPrice,
      roomType,
      occupancy,
      furnished,
      lat,
      lng,
      radius = 25,
      date,
    } = req.query;

    let query = {};
    let andConditions = [];

    const extractPostcode = (text) => {
      if (!text) return null;

      const clean = text.toUpperCase().trim();

      const full = clean.match(/[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}/);
      if (full) return full[0].replace(/\s+/g, "");

      const prefix = clean.match(/^[A-Z]{1,2}\d{1,2}[A-Z]?/);
      if (prefix) return prefix[0];

      return null;
    };

    const normalizePostcode = (postcode) =>
      postcode.replace(/\s+/g, "").toUpperCase();

    // ===============================
    // ✅ SEARCH
    // ===============================
    let isPostcodeSearch = false;

    if (search && search.trim() !== "") {
      const clean = search.trim();
      const extractedPostcode = extractPostcode(clean);

      if (extractedPostcode) {
        isPostcodeSearch = true;

        if (extractedPostcode.length > 4) {
          // FULL postcode (normalized match)
          andConditions.push({
            $expr: {
              $eq: [
                {
                  $replaceAll: {
                    input: "$location.postcode",
                    find: " ",
                    replacement: "",
                  },
                },
                extractedPostcode,
              ],
            },
          });
        } else {
          // PREFIX search (NW2)
          andConditions.push({
            "location.postcode": {
              $regex: "^" + extractedPostcode,
              $options: "i",
            },
          });
        }
      } else {

        const cityAliases = {
          "greater london": "London",
          "greater manchester": "Manchester",
          "west midlands": "Birmingham",
          "west yorkshire": "Leeds",
          "merseyside": "Liverpool",
          "south yorkshire": "Sheffield",
        };
        // TEXT SEARCH
        const normalizedSearch =
          cityAliases[clean.toLowerCase()] || clean;

        const searchRegex = new RegExp(normalizedSearch, "i");

        andConditions.push({
          $or: [
            { title: searchRegex },
            { "location.address": searchRegex },
            { "location.city": searchRegex },
            { "location.postcode": searchRegex },
          ],
        });
      }
    }

    // ===============================
    // ✅ GEO (ONLY if NOT postcode)
    // ===============================
    if (
      lat &&
      lng &&
      !isNaN(lat) &&
      !isNaN(lng) &&
      isPostcodeSearch
    ) {
      andConditions.push({
        location: {
          $geoWithin: {
            $centerSphere: [
              [Number(lng), Number(lat)],
              Number(radius) / 6378.1,
            ],
          },
        },
      });
    }

    // ===============================
    // ✅ OTHER FILTERS
    // ===============================
    if (minPrice || maxPrice) {
      let priceQuery = {};

      if (minPrice && !isNaN(minPrice)) {
        priceQuery.$gte = Number(minPrice);
      }

      if (maxPrice && !isNaN(maxPrice)) {
        priceQuery.$lte = Number(maxPrice);
      }

      andConditions.push({ monthlyPrice: priceQuery });
    }

    if (roomType) {
      andConditions.push({ roomType });
    }

    if (occupancy) {
      andConditions.push({ occupancy });
    }

    if (furnished !== undefined) {
      andConditions.push({
        furnished: furnished === "true",
      });
    }

    if (date) {
      andConditions.push({
        availableFrom: { $lte: new Date(date) },
      });
    }

    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    const listings = await Listing.find(query)
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (error) {
    console.error("Search Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ============================================
// ⭐ FEATURED LISTINGS (CACHED)
// ============================================
export const getFeaturedListings = async (req, res) => {
  try {
    const cacheKey = "listings:featured";

    const cached = await redis.get(cacheKey);

    if (cached) {
      const listings =
        typeof cached === "string" ? JSON.parse(cached) : cached;

      console.log("⚡ GET FROM CACHE:", cacheKey);

      return res.json({
        success: true,
        source: "cache",
        listings,
      });
    }

    const listings = await Listing.find({ featured: true })
      .select("_id slug title images description location monthlyPrice availableImmediately availableFrom listingId")
      .sort({ createdAt: -1 })
      .lean();

    // ✅ Upstash native JSON (no stringify needed)
    await redis.set(cacheKey, listings, {
      ex: 60 * 60,
    });

    console.log("💾 STORED IN CACHE:", cacheKey);

    return res.json({
      success: true,
      source: "db",
      listings,
    });

  } catch (error) {
    console.error("❌ ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ============================================
// 🌍 META (CACHED)
// ============================================
export const getListingMeta = async (req, res) => {
  try {
    const cacheKey = "listings:meta";

    // 🔹 Check cache
    let cached = await redis.get(cacheKey);

    if (cached) {
      let listings;

      try {
        // ✅ Handle both string + object cases (fix your error)
        listings =
          typeof cached === "string" ? JSON.parse(cached) : cached;
      } catch (err) {
        console.error("Cache parse error:", err);
        listings = [];
      }

      return res.status(200).json({
        success: true,
        source: "cache",
        listings,
      });
    }

    // 🔹 Fetch from DB
    const listings = await Listing.find()
      .select("title description slug createdAt updatedAt")
      .sort({ createdAt: -1 })
      .lean(); // ✅ better performance

    // 🔹 Store in Redis (stringify ONLY here)
    await redis.set(cacheKey, JSON.stringify(listings), "EX", 60 * 10); 
    // expires in 10 minutes (optional but recommended)

    return res.status(200).json({
      success: true,
      source: "db",
      listings,
    });

  } catch (error) {
    console.error("getListingMeta error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const getNearbyListings = async (req, res) => {
  try {
    const { lng, lat, currentId } = req.query;

    if (!lng || !lat) {
      return res.status(400).json({ message: "Longitude and Latitude are required." });
    }

    const nearbyRooms = await Listing.find({
      // 1. Exclude the current listing the user is viewing
      _id: { $ne: currentId },
      // 2. Ensure we only show available rooms
      status: "available",
      // 3. Geo-spatial query
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)], // [longitude, latitude]
          },
          $maxDistance: 5000, // Distance in meters (5km radius)
        },
      },
    })
    .select("title monthlyPrice roomType bathroomType location images availableImmediately availableFrom");

    res.status(200).json(nearbyRooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching nearby rooms", error: error.message });
  }
};