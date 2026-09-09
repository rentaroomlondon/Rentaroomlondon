import mongoose from "mongoose";
import slugify from "slugify";

const makeSlug = (value) =>
  slugify(String(value || ""), {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [150, "Title cannot be more than 150 characters"],
    },

    // Custom URL — editable by admin. Auto-generated from title when left blank.
    slug: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },

    // SEO <title>. Falls back to `title` on the frontend when empty.
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [120, "Meta title cannot be more than 120 characters"],
      default: "",
    },

    // SEO meta description. Falls back to `excerpt` on the frontend when empty.
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [320, "Meta description cannot be more than 320 characters"],
      default: "",
    },

    excerpt: {
      type: String,
      required: [true, "Please add a short description"],
      maxlength: [300, "Excerpt cannot be more than 300 characters"],
    },
    content: {
      type: String,
      required: [true, "Please add full content"],
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Generate a slug from the title only when none was supplied.
BlogSchema.pre("validate", function (next) {
  if (this.slug && this.slug.trim()) {
    this.slug = makeSlug(this.slug);
  } else if (this.title) {
    this.slug = makeSlug(this.title);
  }
  next();
});

// Normalise slug on updates. Only changes the slug when the admin sends one.
BlogSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() || {};
  if (update.slug !== undefined) {
    const cleaned = makeSlug(update.slug);
    if (cleaned) {
      update.slug = cleaned;
    } else {
      delete update.slug;
    }
    this.setUpdate(update);
  }
  next();
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
