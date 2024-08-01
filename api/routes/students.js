import Express from "express";
import { addStudent, listStudents, checkPresence } from "../controllers/student.js";
const router = Express.Router();

router.post("/", addStudent)
router.post("/list", listStudents)
router.post("/checkpresence", checkPresence)

export default router;