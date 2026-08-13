import express from "express";
import { submitContact } from "../Controllers/contactController.js";
import { contactLimiter } from "../utils/contactLimiter.js";

const 
router = express.Router();

router.post("/", contactLimiter, submitContact);

export default router;