import { Router } from "express";
import { createSong } from "../controller/adminController.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/songs", protectRoute, requireAdmin, createSong);
router.delete("/songs/id", protectRoute, requireAdmin, deleteSong);

export default router;