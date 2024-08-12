import Express from "express";
const router = Express.Router();

import { addAdmin, authorizationMonitorEvent, deleteAdmin, getAdmins, getMonitors, updateAdmin } from "../controllers/admin.js";

router.post("/authmonitor", authorizationMonitorEvent)
router.get("/", getAdmins)
router.get("/monitors/:idevent", getMonitors)
router.post("/", addAdmin)
router.put("/:idadmin", updateAdmin)
router.delete("/:idadmin", deleteAdmin)

export default router;