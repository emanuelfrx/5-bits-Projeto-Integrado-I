import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const addLecture = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")
        if (adminInfo.role == 0) return res.status(403).json("User have not permision")

        const q = "INSERT INTO lectures (`title`, `instructor`, `eventid`) VALUES (?)"

        const values = [
            req.body.inputs.name,
            req.body.inputs.instructor,
            req.body.inputs.eventid
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(values)

            const lectureid = data.insertId

            let q = "INSERT INTO classes (`title`, `lectureid`) VALUES "

            for (let i = 0; i < req.body.classes.length; i++) {
                q += "('" + req.body.classes[i].title + "'," + data.insertId + ")" + (i + 1 == req.body.classes.length ? ";" : ",")
            }

            db.query(q, (err, data) => {
                if (err) {
                    return res.status(500).json(err)
                }

                let q = "SELECT * FROM students WHERE eventid = ?"

                db.query(q, [req.body.inputs.eventid] ,(err, data) => {
                    if (err) {
                        return res.status(500).json(err)
                    }

                    if(data.length == 0) { return res.status(200).json("lecture has been created") }

                    let q = "INSERT INTO studentslec (`lectureid`, `studentid`) VALUES"

                    for (let i = 0; i < data.length; i++) {
                        q += "(" + lectureid + "," + data[i].idstudent + ")" + (i + 1 == data.length ? ";" : ",")
                    }

                    db.query(q ,(err, data) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).json(err)
                        }

                        res.status(200).json("lecture has been created")
                    })
                })
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

        const q = "UPDATE lectures SET title = ?, instructor = ? WHERE idlecture = ?"

        const values = [
            req.body.inputs.name,
            req.body.inputs.instructor,
            req.params.idlecture
        ]

        db.query(q, values, (err, data) => {
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

export const getCertificates = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")
        if (adminInfo.role == 0) return res.status(403).json("User have not permision")

        const q = `SELECT * FROM students AS s LEFT JOIN studentslec ON s.idstudent = studentslec.studentid LEFT JOIN presences ON presences.studentlecid = studentslec.idstudentlec WHERE ? = studentslec.lectureid  ORDER BY name ASC`


        db.query(q, [req.body.idlecture], (err, data) => {
            if (err) return res.status(500).json(err)

            const students_list = [];
            var setStudents = new Map();

            data.forEach(student_instace => {

                if (!setStudents.has(student_instace.idstudent)) {

                    setStudents.set(student_instace.idstudent, students_list.length)
                    students_list[setStudents.get(student_instace.idstudent)] = {}
                    students_list[setStudents.get(student_instace.idstudent)].name = student_instace.name
                    students_list[setStudents.get(student_instace.idstudent)].idstudent = student_instace.idstudent
                    students_list[setStudents.get(student_instace.idstudent)].tot_presences = 0
                }

                if (student_instace.idpresence != null) {
                    students_list[setStudents.get(student_instace.idstudent)].tot_presences++;
                }
            });

            const q = "SELECT COUNT(*) FROM classes WHERE lectureid = ?"

            db.query(q, [req.body.idlecture], (err, data) => {
                if (err) return res.status(500).json(err)

                const tot_classes = data[0]['COUNT(*)']

                const resp = {
                    tot_classes: tot_classes,
                    students: students_list
                }

                return res.status(200).json(resp)
            })
        })

    })

}