import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const addLecture = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")
        if (adminInfo.role == 0) return res.status(403).json("User have not permision")

        const q = "INSERT INTO lectures (`title`, `eventid`) VALUES (?)"

        const values = [
            req.body.inputs.name,
            req.body.inputs.eventid
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(values)

            let q = "INSERT INTO classes (`title`, `lectureid`) VALUES "

            for (let i = 0; i < req.body.classes.length; i++) {
                q += "('" + req.body.classes[i].title + "'," + data.insertId + ")" + (i + 1 == req.body.classes.length ? ";" : ",")
            }

            db.query(q, (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json(err)
                }
                return res.status(200).json("lecture has been created")
            })

        })
    })
}

export const updateLecture = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        if (adminInfo.role == 0) return res.status(403).json("User have not permision")

        const q = "UPDATE lectures SET `title` = ? WHERE idlecture = ?"

        const values = [
            req.body.inputs.name
        ]

        db.query(q, [values, req.params.idlecture], (err, data) => {
            if (err) return res.status(500).json(values)

            //delete classes

            const q = "DELETE FROM classes WHERE lectureid = ?"

            db.query(q, [req.params.idlecture], (err, data) => {

                let q = "INSERT INTO classes (`title`, `lectureid`) VALUES "

                for (let i = 0; i < req.body.classes.length; i++) {
                    q += "('" + req.body.classes[i].title + "'," + req.params.idlecture + ")" + (i + 1 == req.body.classes.length ? ";" : ",")
                }

                db.query(q, (err, data) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json(err)
                    }
                    return res.status(200).json("lecture has been created")
                })
            })

        })

    })

}

export const listLectures = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = `SELECT * FROM lectures AS s WHERE ? = s.eventid`

        db.query(q, req.body.eventid, (err, data) => {
            if (err) return res.status(500).json(err)

            return res.status(200).json(data)
        })

    })

}

export const deleteLecture = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")
        if (adminInfo.role == 0) return res.status(403).json("User have not permision")

        const q = "DELETE FROM lectures WHERE idlecture = ?"

        db.query(q, [req.params.idlecture], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("User deleted!")
        })

    })

}