import { Router } from "express";
import { protect } from "../middleWares/authMiddleware.js";
import { upload } from "../middleWares/upload.js";
import { createDocument } from "../Controllers/DocumentController.js";

const router = Router();
router.post("/upload/", protect, upload, createDocument);
export default router;
