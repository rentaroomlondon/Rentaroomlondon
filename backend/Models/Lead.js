import mongoose from "mongoose";

const roomLeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.RoomLead || mongoose.model("RoomLead", roomLeadSchema);
