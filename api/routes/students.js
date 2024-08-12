import Express from "express";
import { addStudent, listStudents, checkPresence, addStudents, getStudentsClass } from "../controllers/student.js";
const router = Express.Router();

router.post("/", addStudent)
router.post("/addstudents", addStudents)
router.post("/list", listStudents)
router.post("/checkpresence", checkPresence)
router.post("/class", getStudentsClass)

export default router;