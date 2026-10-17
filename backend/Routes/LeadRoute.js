import express from "express";
import { createRoomLead, createCrmLead, getAllRoomLeads, receiveGoogleAdsLead, updateRoomLead } from "../Controllers/LeadController.js";
import { contactLimiter } from "../utils/contactLimiter.js";
import { requireAdmin } from "../Middleware/requireAdmin.js";

const router = express.Router();

// POST route for submitting a new room lead
router.post("/submit-lead", contactLimiter, createRoomLead);

// Google Ads posts lead form submissions directly to this public, key-verified endpoint.
router.post("/google-ads", receiveGoogleAdsLead);

// CRM access requires a signed-in admin session.
router.get("/", requireAdmin, getAllRoomLeads);
router.post("/", requireAdmin, createCrmLead);
router.patch("/:id", requireAdmin, updateRoomLead);

export default router;
