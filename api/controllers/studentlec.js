import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const addStudent = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = "INSERT INTO studentslec (`name`, `email`, `date_born`, `eventid`) VALUES (?)"

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

    })

}

export const addStudents = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        let q = "INSERT INTO studentslec (`name`, `email`, `date_born`, `eventid`) VALUES "

        for (let i = 0; i < req.body.excelData.length; i++) {
            q += "('" + req.body.excelData[i].name + "','" + req.body.excelData[i].email + "', '" + req.body.excelData[i].date_born + "', " + req.body.eventid + ")" + (i + 1 == req.body.excelData.length ? ";" : ",")
        }

        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("addStudentsSuccess")
        })

    })

}

export const listStudents = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = `SELECT * FROM studentslec AS s WHERE ? = s.lectureid`

        db.query(q, req.body.lectureid, (err, data) => {
            if (err) return res.status(500).json(values)
            return res.status(200).json(data)
        })

    })

}

export const getStudentsClass = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = `SELECT * FROM studentslec LEFT JOIN presences pre ON pre.classid = ? AND idstudentlec = pre.studentid WHERE lectureid = ?`
        db.query(q, [req.body.idclass, req.body.lectureid], (err, data) => {
            if (err) return res.status(500).json(err)

            return res.status(200).json(data)
        })
    })
}

export const checkPresence = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = "SELECT * FROM presences AS pre WHERE pre.studentid = ? AND pre.classid = ?"

        const values = [
            req.body.idstudent,
            req.body.idclass
        ]

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err)

            let q

            if (data.length > 0) {
                q = "DELETE FROM presences AS pre WHERE pre.studentid = ? AND pre.classid = ?"
                db.query(q, values, (err, data) => {
                    if (err) return res.status(500).json(err)

                    res.status(200).json("Presence changed success!")
                })
            } else {
                q = "INSERT INTO presences (`studentid`, `classid`) VALUES (?)"
                db.query(q, [values], (err, data) => {
                    if (err) return res.status(500).json(err)

                    res.status(200).json("Presence changed success!")
                })
            }
        })
    })

}

export const markAll = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

            const q = `SELECT * FROM studentslec LEFT JOIN presences pre ON pre.classid = ? AND idstudentlec = pre.studentid WHERE lectureid = ?`

            db.query(q, [req.body.idclass, req.body.lectureid], (err, data) => { 
                if (err) return res.status(500).json(err)

                let q = "INSERT INTO presences (`studentid`, `classid`) VALUES "

                let cont = 0

                for( let i = 0; i < data.length; i++ ){
                    if(data[i].idpresence == null){
                        q += ( cont > 0 ? "," : "")
                        q += "(" + data[i].idstudentlec + "," + req.body.idclass + ")"
                        cont++
                    }
                }

                q += ( cont > 0 ? ";" : "")

                if ( cont == 0)
                    return res.status(200).json("0 changes in DB")

                db.query(q, (err, data) => {
                    if (err) return res.status(500).json(err)
                    return res.status(200).json("success")
                })
            })
    })
}

export const unmarkAll = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

            const q = `SELECT * FROM studentslec LEFT JOIN presences pre ON pre.classid = ? AND idstudentlec = pre.studentid WHERE lectureid = ?`

            db.query(q, [req.body.idclass, req.body.lectureid], (err, data) => { 
                if (err) return res.status(500).json(err)

                let q = "DELETE FROM presences WHERE studentid IN ("

                let cont = 0

                for( let i = 0; i < data.length; i++ ){
                    if(data[i].idpresence != null){
                        q += ( cont > 0 ? "," : "")
                        q +=  data[i].idstudentlec
                        cont++
                    }
                }

                q += ( cont > 0 ? ");" : ")")

                if ( cont == 0)
                    return res.status(200).json("0 changes in DB")

                db.query(q, (err, data) => {
                    if (err) return res.status(500).json(err)
                    return res.status(200).json("success")
                })
            })
    })
}

export const importStudents = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

            const q = `SELECT * FROM lectures LEFT JOIN events ON lectures.eventid = events.idevent WHERE idlecture = ?`

            db.query(q, [req.body.idlecture], (err, data) => { 
                if (err) return res.status(500).json(err)

                if(data.length == 0 ) return res.status(404).json("not found lecture")

                const q = `SELECT * FROM students WHERE eventid = ?`

                db.query(q, [data[0].idevent] , (err, data) => {
                    if (err) return res.status(500).json(err)

                    if( data.length == 0 ) return res.status(500).json("no data to import")

                    let q = "INSERT INTO studentslec (`name`, `email`, `date_born`, `lectureid`, `category`, `gender`) VALUES "

                    for( let i = 0; i < data.length; i++ ){
                        q += "('" + data[i].name + "','" + data[i].email + "', '" + data[i].date_born + "', " + req.body.idlecture + ", '" + data[i].category + "', '" + data[i].gender + "' )";
                        q += i + 1 < data.length ? "," : ";"
                    }


                    db.query(q, (err, data) => {
                        if (err) return res.status(500).json(err)
                        return res.status(200).json("success")
                    })
                })
            })
    })
}

/*
export const markAll = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = "SELECT * FROM presences AS pre WHERE pre.studentid = ? AND pre.classid = ?"

        const values = [
            req.body.idstudent,
            req.body.idclass
        ]

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err)

            let q

            if (data.length > 0) {
                q = "DELETE FROM presences AS pre WHERE pre.studentid = ? AND pre.classid = ?"
                db.query(q, values, (err, data) => {
                    if (err) return res.status(500).json(err)

                    res.status(200).json("Presence changed success!")
                })
            } else {
                q = "INSERT INTO presences (`studentid`, `classid`) VALUES (?)"
                db.query(q, [values], (err, data) => {
                    if (err) return res.status(500).json(err)

                    res.status(200).json("Presence changed success!")
                })
            }
        })
    })

}

/*
export const checkPresence = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {

        const q = `SELECT * FROM students AS s WHERE ? = s.idstudent`

        db.query(q, req.body.studentid, (err, data) => {
            if (err) return res.status(500).json(err)

            if (data.length <= 0) return res.status(401).json("Student Id Error")

            const q = `UPDATE students AS s SET presence = ? WHERE ` + data[0].idstudent + ` = s.idstudent`

            const changedpresence = data[0].presence ? 0 : 1

            db.query(q, [changedpresence], (err, data) => {
                if (err) return res.status(500).json(err)

                return res.status(200).json("Presence Changed !")
            })
        })

    })

}*/