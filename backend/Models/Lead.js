import mongoose from "mongoose";

const roomLeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      trim: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },
    roomType: {
      type: String,
      enum: ["", "Single", "Double", "Ensuite"],
      default: "",
    },
    monthlyBudget: {
      type: String,
      enum: ["", "Under £600", "£600–£750", "£750–£900", "£900+"],
      default: "",
    },
    source: { type: String, enum: ["website", "google_ads", "manual"], default: "website", index: true },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Viewing booked", "Won", "Lost"],
      default: "New",
      index: true,
    },
    notes: { type: String, default: "", trim: true, maxlength: 5000 },
    assignedTo: { type: String, default: "", trim: true, maxlength: 120 },
    googleLeadId: { type: String, sparse: true, unique: true },
    google: {
      campaignId: String,
      adGroupId: String,
      creativeId: String,
      formId: String,
      clickId: String,
      apiVersion: String,
      leadSource: String,
      submittedAt: Date,
      isTest: { type: Boolean, default: false },
      answers: [{ question: String, answer: String }],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.RoomLead || mongoose.model("RoomLead", roomLeadSchema);
