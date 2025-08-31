import express from "express";
import { generateResumePDF } from "../controllers/pdfController.js";

const router = express.Router();

// POST /pdf/generate
router.post("/generate", generateResumePDF);

export default router;
