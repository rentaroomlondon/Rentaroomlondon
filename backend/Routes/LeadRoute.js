import express from "express";
import { createRoomLead, getAllRoomLeads } from "../Controllers/LeadController.js";
import { contactLimiter } from "../utils/contactLimiter.js";

const router = express.Router();

// POST route for submitting a new room lead
router.post("/submit-lead", contactLimiter, createRoomLead);

// Admin only
router.get("/", getAllRoomLeads);

export default router;