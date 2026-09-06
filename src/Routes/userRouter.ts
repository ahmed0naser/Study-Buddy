import { Router } from "express";
import { signup, login, getMe } from "../Controllers/authController.js";
import { protect } from "../middleWares/authMiddleware.js";
const router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getMe);
export default router;
