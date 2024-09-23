import Express from "express";
const router = Express.Router();

import { addAdmin, authorizationMonitorEvent, changeImage, deleteAdmin, getAdmins, getInfoAdmin, getMonitors, updateAdmin, updateProfile } from "../controllers/admin.js";

router.post("/authmonitor", authorizationMonitorEvent)
router.get("/getinfo", getInfoAdmin)
router.get("/", getAdmins)
router.get("/monitors/:idevent", getMonitors)
router.post("/", addAdmin)
router.post("/changeimage", changeImage)
router.put("/:idadmin", updateAdmin)
router.put("/updateprofile/:idadmin", updateProfile)
router.delete("/:idadmin", deleteAdmin)

export default router;