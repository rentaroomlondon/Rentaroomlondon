import Listing from "../Models/Listing.js";
import slugify from "slugify";
import { redis } from "../utils/redis.js";
import { clearListingCache } from "../utils/clearCache.js";

// ============================================
// 🔥 GENERATE UNIQUE SLUG
// ============================================
const generateUniqueSlug = async (title) => {
  let baseSlug = slugify(title, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;
  let counter = 1;

  while (await Listing.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

// ============================================
// 🔥 GENERATE IDs
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
    const data = req.body;

    data.slug = await generateUniqueSlug(data.title);
    data.listingId = generateListingId();

    const listing = await Listing.create(data);

    await clearListingCache();

    res.status(201).json({
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
// ✏️ UPDATE LISTING
// ============================================
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

    if (req.body.title && req.body.title !== listing.title) {
      req.body.slug = await generateUniqueSlug(req.body.title);
    }

    listing = await Listing.findOneAndUpdate(
      { slug },
      req.body,
      { new: true, runValidators: true }
    );

    await clearListingCache();

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
    // ✅ Safe parsing
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);

    const cacheKey = `listings:all:${page}:${limit}`;

    // ============================================
    // 🔥 CACHE GET
    // ============================================
    if (redis) {
      const cached = await redis.get(cacheKey);

      if (cached) {
        console.log("⚡ CACHE HIT:", cacheKey);

        try {
          const parsed =
            typeof cached === "string" ? JSON.parse(cached) : cached;

          return res.json({
            success: true,
            source: "cache",
            ...parsed,
          });
        } catch (err) {
          console.error("❌ Cache parse error:", err);
        }
      } else {
        console.log("❌ CACHE MISS:", cacheKey);
      }
    }

    // ============================================
    // 🔥 DB QUERY
    // ============================================
    const skip = (page - 1) * limit;

    const [listings, total] = await Promise.all([
      Listing.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Listing.countDocuments(),
    ]);

    const response = {
      total,
      page,
      pages: Math.ceil(total / limit),
      listings,
    };

    // ============================================
    // 🔥 CACHE SET (24 HOURS)
    // ============================================
    if (redis) {
      await redis.set(cacheKey, JSON.stringify(response), {
        ex: 60 * 60 * 24, // ✅ 24 hours
      });

      console.log("💾 CACHE SET:", cacheKey);
    }

    return res.json({
      success: true,
      source: "db",
      ...response,
    });
  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
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
      radius = 5,
      date,
    } = req.query;

    let query = {};
    let andConditions = [];

    // ===============================
    // ✅ HELPER: EXTRACT UK POSTCODE
    // ===============================
    const extractPostcode = (text) => {
      if (!text) return null;

      const match = text.toUpperCase().match(
        /[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}/
      );

      return match ? match[0].replace(/\s+/g, "") : null;
    };

    // ===============================
    // ✅ 1. TEXT / POSTCODE SEARCH
    // ===============================
    if (search && search.trim() !== "") {
      const clean = search.trim();

      // 🔥 extract postcode from full string
      const extractedPostcode = extractPostcode(clean);

      if (extractedPostcode) {
        // ✅ STRICT postcode match (START WITH)
        andConditions.push({
          "location.postcode": {
            $regex: "^" + extractedPostcode,
            $options: "i",
          },
        });
      } else {
        // ✅ NORMAL TEXT SEARCH
        andConditions.push({
          $or: [
            { title: { $regex: clean, $options: "i" } },
            { "location.address": { $regex: clean, $options: "i" } },
            { "location.city": { $regex: clean, $options: "i" } },
          ],
        });
      }
    }

    // ===============================
    // ✅ 2. PRICE FILTER
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

    // ===============================
    // ✅ 3. ROOM TYPE
    // ===============================
    if (roomType) {
      andConditions.push({ roomType });
    }

    // ===============================
    // ✅ 4. OCCUPANCY
    // ===============================
    if (occupancy) {
      andConditions.push({ occupancy });
    }

    // ===============================
    // ✅ 5. FURNISHED
    // ===============================
    if (furnished !== undefined) {
      andConditions.push({ furnished: furnished === "true" });
    }

    // ===============================
    // ✅ 6. DATE FILTER
    // ===============================
    if (date) {
      andConditions.push({
        availableFrom: { $lte: new Date(date) },
      });
    }

    // ===============================
    // ✅ 7. GEO SEARCH (SAFE MERGE)
    // ===============================
    if (lat && lng) {
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
    // ✅ FINAL QUERY BUILD
    // ===============================
    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    // ===============================
    // ✅ EXECUTE QUERY
    // ===============================
    const listings = await Listing.find(query)
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: listings.length,
      listings,
    });

  } catch (error) {
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

    const cached = await redis.get(cacheKey);

    if (cached) {
      return res.json({
        success: true,
        source: "cache",
        listings: JSON.parse(cached),
      });
    }

    const listings = await Listing.find()
      .select("title description slug createdAt updatedAt")
      .sort({ createdAt: -1 });

    await redis.set(cacheKey, JSON.stringify(listings));

    res.json({
      success: true,
      source: "db",
      listings,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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