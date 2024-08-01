import express from "express";
import { getEvents, addEvent, checkEvent } from "../controllers/event.js"

const router = express.Router();

router.get("/", getEvents);
router.post("/", addEvent)
router.post("/check", checkEvent)


export default router;