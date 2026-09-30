import express from "express";
import upload from "../middleware/multer.middleware.js";
import { uploadPDF } from "../controllers/pdf.controller.js";
import { askQuestion } from "../controllers/question.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/upload", verifyJWT, upload.single("pdf"), uploadPDF);

router.post("/ask", verifyJWT, askQuestion);

export default router;