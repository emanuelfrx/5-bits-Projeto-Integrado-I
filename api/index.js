import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

import adminRoutes from "./routes/admins.js"
import authRoutes from "./routes/auth.js"
import eventRoutes from "./routes/events.js"
import studentsRoutes from "./routes/students.js"
import lecturesRoutes from "./routes/lectures.js"
import classesRoutes from "./routes/classes.js"
import studentslecRoutes from "./routes/studentslec.js"


//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())

//multer - dps add new route

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/assets/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file
    res.status(200).json(file.filename)
})

//end - multer

app.use("/api/admins", adminRoutes)
app.use("/api/events", eventRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/students", studentsRoutes)
app.use("/api/lectures", lecturesRoutes)
app.use("/api/classes", classesRoutes)
app.use("/api/studentslec", studentslecRoutes)

app.listen(8800, () => {
    console.log("Running!!!!")
})