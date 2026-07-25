import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    moveIn: {
      type: String,
      required: [true, "Move-in time is required"],
      enum: [
        "Within 1 week",
        "Within 1 month",
        "Within 3 months",
        "Within 6 months",
      ],
    },
    area: {
      type: String,
      required: [true, "Area is required"],
      trim: true,
    },
    lengthOfStay: {
      type: String,
      required: [true, "Length of stay is required"],
      enum: [
        "less than month",
        "1-2 months",
        "3-5 months",
        "6-9 months",
        "10-12 months",
      ],
    },
    budget: {
      type: String,
      required: [true, "Budget is required"],
      enum: ["620-1500", "1500-2500", "2500-3500", "3500+"],
    },
    selectedLocationId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Enquiry", enquirySchema);