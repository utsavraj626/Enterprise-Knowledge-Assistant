import express from "express";

import {getAllDocuments, getSingleDocument} from "../controllers/document.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyJWT, getAllDocuments);

router.get("/:documentId", verifyJWT, getSingleDocument);

export default router;