import Express from "express";
const router = Express.Router();

import { getTiago } from "../controllers/admin.js";

router.get("/test", getTiago)

export default router;