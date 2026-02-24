import express from "express";
import * as urlController from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorten", urlController.createShortUrl);

router.get("/:shortCode", urlController.redirectUrl);

export default router;
