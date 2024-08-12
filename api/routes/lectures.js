import express from "express";
import { addLecture, deleteLecture, listLectures, updateLecture } from "../controllers/lectures.js"

const router = express.Router();

router.delete("/:idlecture", deleteLecture)
router.put("/:idlecture", updateLecture)
router.post("/list", listLectures);
router.post("/", addLecture)


export default router;