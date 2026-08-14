import express from "express";
import { getAllContacts, submitContact } from "../Controllers/contactController.js";
import { contactLimiter } from "../utils/contactLimiter.js";

const 
router = express.Router();

router.post("/", contactLimiter, submitContact);

// Admin only
router.get("/", getAllContacts);

export default router;