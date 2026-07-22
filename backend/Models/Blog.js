import mongoose from "mongoose";
import slugify from "slugify";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [150, "Title cannot be more than 150 characters"],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      immutable: true,
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

// Auto-generate slug from title before saving
BlogSchema.pre("save", function (next) {
  if (!this.isModified("title")) {
    return next();
  }
  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });
  next();
});

// Update slug if title is modified during updates
BlogSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.title) {
    update.slug = slugify(update.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });
  }
  next();
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);