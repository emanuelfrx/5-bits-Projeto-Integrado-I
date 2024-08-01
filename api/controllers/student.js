import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const addStudent = (req, res) => {

    const q = "INSERT INTO students (`name`, `email`, `date_born`, `eventid`) VALUES (?)"

    const values = [
        req.body.name,
        req.body.email,
        req.body.date_born,
        req.body.eventid
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(values)
        return res.status(200).json("student has been created")
    })

}

export const listStudents = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {

        const q = `SELECT * FROM students AS s WHERE ? = s.eventid`

        db.query(q, req.body.eventid, (err, data) => {
            if (err) return res.status(500).json(values)
            return res.status(200).json(data)
        })

    })

}

export const checkPresence = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {

        const q = `SELECT * FROM students AS s WHERE ? = s.idstudent`

        db.query(q, req.body.studentid, (err, data) => {
            if (err) return res.status(500).json(err)

            if( data.length <= 0 ) return res.status(401).json("Student Id Error")

            const q = `UPDATE students AS s SET presence = ? WHERE `+data[0].idstudent+` = s.idstudent`

            const changedpresence = data[0].presence ? 0 : 1

            db.query(q, [changedpresence], (err, data) => {
                if (err) return res.status(500).json(err)

                return res.status(200).json("Presence Changed !")
            })
        })

    })

}