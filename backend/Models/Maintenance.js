import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    // if logged in user exists
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    category: String,
    priority: {
      type: String,
      enum: ["Low", "Routine", "Urgent"],
      default: "Routine"
    },

    description: String,
    issueStarted: Date,

    // Tenant details (for guest users)
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,

    contactTime: String,
    access: String,

    photos: [String],

    status: {
      type: String,
      enum: ["Pending", "Assigned", "Completed"],
      default: "Pending"
    }

  },
  { timestamps: true }
);

export default mongoose.model("Maintenance", maintenanceSchema);