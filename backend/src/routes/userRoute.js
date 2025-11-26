import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js"

const router = Router();

router.get("/like", protectRoute, (req, res) => {
    req.auth.userId
    res.send("User route with GET method.");
});

export default router;