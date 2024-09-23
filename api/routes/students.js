import Express from "express";
import { addStudent, listStudents, addStudents, changeLecture, accredit } from "../controllers/student.js";
const router = Express.Router();

router.post("/", addStudent)
router.post("/addstudents", addStudents)
router.post("/list", listStudents)
router.post("/changelecture", changeLecture)
router.post("/changeaccredited", accredit)

/*
router.post("/checkpresence", checkPresence)
router.post("/checkpresenceall", markAll)
router.post("/deletepresenceall", unmarkAll)
router.post("/class", getStudentsClass)
*/

export default router;