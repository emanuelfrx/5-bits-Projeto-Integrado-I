import express from "express";
import { getEvents, addEvent, checkEvent, getEvent, updateEvent } from "../controllers/event.js"

const router = express.Router();

router.get("/", getEvents);
router.get("/event/:idevent", getEvent);
router.post("/", addEvent)
router.post("/check", checkEvent)
router.put("/event_update", updateEvent)


export default router;