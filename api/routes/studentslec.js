import Express from "express";
import { addStudent, listStudents, checkPresence, addStudents, getStudentsClass, markAll, unmarkAll, importStudents } from "../controllers/studentlec.js";
const router = Express.Router();

router.post("/", addStudent)
router.post("/addstudents", addStudents)
router.post("/list", listStudents)
router.post("/checkpresence", checkPresence)
router.post("/checkpresenceall", markAll)
router.post("/deletepresenceall", unmarkAll)
router.post("/class", getStudentsClass)
router.post("/importstudents", importStudents)

export default router;