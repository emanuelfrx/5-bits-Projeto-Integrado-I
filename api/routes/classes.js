import express from "express";
import { addClass, getClass, listClass} from "../controllers/classes.js"

const router = express.Router();

//router.get("/", listClass);
router.post("/", addClass)
router.get("/list/:idlecture", listClass)
router.get("/:idclass", getClass)


export default router;