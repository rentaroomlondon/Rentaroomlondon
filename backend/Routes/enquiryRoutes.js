import express from "express";
import { submitEnquiry } from "../Controllers/enquiryController.js";
import { contactLimiter } from "../utils/contactLimiter.js";

const router = express.Router();

// POST /api/enquiries
router.post("/", contactLimiter, submitEnquiry);

export default router;