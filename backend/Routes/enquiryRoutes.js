import express from "express";
import { submitEnquiry } from "../Controllers/enquiryController.js";

const router = express.Router();

// POST /api/enquiries
router.post("/", submitEnquiry);

export default router;