import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.js"
import { normalAuth } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/", normalAuth);

export default router;