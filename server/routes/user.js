import express from "express";
import { usersPost } from "../controllers/user.js";

const router = express.Router();

router.get("/", usersPost);

export default router;