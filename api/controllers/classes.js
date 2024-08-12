import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const addClass = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")
        if (adminInfo.role == 0) return res.status(403).json("User have not permision")

        const q = "INSERT INTO classes (`title`, `lectureid`) VALUES (?)"

        const values = [
            req.body.title,
            req.body.lectureid
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(values)
            return res.status(200).json("class has been created")
        })

    })
}

export const listClass = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = `SELECT * FROM classes AS c WHERE ? = c.lectureid`

        db.query(q, [req.params.idlecture], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })

    })

}
