import express from "express";
import { getEvents, addEvent, checkEvent, getEvent, updateEvent, infochartEvent, infoChart, deleteEvent } from "../controllers/event.js"

const router = express.Router();

router.get("/", getEvents);
router.get("/event/:idevent", getEvent);
router.post("/", addEvent)
router.post("/check", checkEvent)
router.post("/deleteevent", deleteEvent)
router.put("/event_update", updateEvent)
router.post("/infochart", infochartEvent)
router.get("/infochartdashboard", infoChart)


export default router;