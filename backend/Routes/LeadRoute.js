import express from "express";
import { createRoomLead } from "../Controllers/LeadController.js";

const router = express.Router();

// POST route for submitting a new room lead
router.post("/submit-lead", createRoomLead);

export default router;