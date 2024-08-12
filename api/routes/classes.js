import express from "express";
import { addClass, listClass} from "../controllers/classes.js"

const router = express.Router();

//router.get("/", listClass);
router.post("/", addClass)
router.get("/list/:idlecture", listClass)


export default router;