import express from "express";

import { getAdminDocuments } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get(
    "/documents",
    verifyJWT,
    verifyAdmin,
    getAdminDocuments
);

export default router;