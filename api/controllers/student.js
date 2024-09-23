import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const addStudent = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = "INSERT INTO students (`name`, `email`, `date_born`, `eventid`) VALUES (?)" 

        const values = [
            req.body.name,
            req.body.email,
            req.body.date_born,
            req.body.eventid
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Participante cadastrado com Sucesso!")
        })

    })

}

export const addStudents = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        let q = "INSERT INTO students (`name`, `email`, `date_born`, `eventid`, `category`, `gender`) VALUES "


        let cont = 0;


        for (let i = 0; i < req.body.excelData.length; i++) {

            let nome = typeof req.body.excelData[i].Nome !== 'undefined' ? req.body.excelData[i].Nome : "";
            let email = typeof req.body.excelData[i]['E-mail'] !== 'undefined' ? req.body.excelData[i]['E-mail'] : "";
            let insc = typeof req.body.excelData[i]['Inscrição'] !== 'undefined' ? req.body.excelData[i]['Inscrição'] : "";
            let genero = typeof req.body.excelData[i]['Gênero'] !== 'undefined' ? req.body.excelData[i]['Gênero'] : "";
            let categoria = typeof req.body.excelData[i].Categoria !== 'undefined' ? req.body.excelData[i].Categoria : "";
            let nascimento = typeof req.body.excelData[i]['Data de nascimento'] !== 'undefined' ? req.body.excelData[i]['Data de nascimento'] : "";

            if (insc == 'Aprovado') {
                if (cont > 0) {
                    q += ", "
                }
                q += "('" + nome + "','" + email + "', '" + nascimento + "', " + req.body.eventid + ", '" + categoria + "', '" + genero + "' )";
                cont++;
            }
        }

        if (cont == 0)
            return res.status(200).json("0 data")

        q += ";"

        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Participantes adicionados ao Evento com Sucesso!")
        })

    })

}

export const listStudents = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = `SELECT * FROM students AS s LEFT JOIN studentslec ON s.idstudent = studentslec.studentid WHERE ? = s.eventid  ORDER BY name ASC`

        db.query(q, req.body.eventid, (err, data) => {
            if (err) return res.status(500).json(err)

            const resp = []

            var meuSet = new Set();

            data.forEach(student => {
                if(!meuSet.has(student.idstudent)){
                    meuSet.add(student.idstudent)
                    resp.push(student)
                }
            });

            return res.status(200).json(resp)
        })

    })

}

export const changeLecture = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = "SELECT * FROM studentslec AS slec WHERE slec.studentid = ? AND slec.lectureid = ?"

        const values = [
            req.body.idstudent,
            req.body.idlecture
        ]

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err)

            let q

            if (data.length > 0) {
                q = "DELETE FROM studentslec AS slec WHERE slec.studentid = ? AND slec.lectureid = ?"
                db.query(q, values, (err, data) => {
                    if (err) return res.status(500).json(err)

                    res.status(200).json("Presence changed success!")
                })
            } else {
                q = "INSERT INTO studentslec (`studentid`, `lectureid`) VALUES (?)"
                db.query(q, [values], (err, data) => {
                    if (err) return res.status(500).json(err)

                    res.status(200).json("Presence changed success!")
                })
            }
        })
    })

}

export const accredit = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = "SELECT * FROM students AS s WHERE s.idstudent = ?"

        db.query(q, req.body.idstudent, (err, data) => {
            if (err) return res.status(500).json(err)

            if (data.length == 0) return res.status(403).json("Not user founded")

            let q

            if (data[0].accredited == 0) {
                q = "UPDATE students SET accredited = 1 WHERE students.idstudent = ?"
            } else {
                q = "UPDATE students SET accredited = 0 WHERE students.idstudent = ?"
            }

            db.query(q, req.body.idstudent, (err, data) => {
                if (err) return res.status(500).json(err)

                res.status(200).json("Accredited changed success!")
            })
        })
    })
}

/*

export const getStudentsClass = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = `SELECT * FROM students LEFT JOIN presences pre ON pre.classid = ? AND idstudent = pre.studentid WHERE eventid = ?`
        db.query(q, [req.body.idclass, req.body.eventid], (err, data) => {
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

            const q = `SELECT * FROM students LEFT JOIN presences pre ON pre.classid = ? AND idstudent = pre.studentid WHERE eventid = ?`

            db.query(q, [req.body.idclass, req.body.eventid], (err, data) => { 
                if (err) return res.status(500).json(err)

                let q = "INSERT INTO presences (`studentid`, `classid`) VALUES "

                let cont = 0

                for( let i = 0; i < data.length; i++ ){
                    if(data[i].idpresence == null){
                        q += ( cont > 0 ? "," : "")
                        q += "(" + data[i].idstudent + "," + req.body.idclass + ")"
                        cont++
                    }
                }

                q += ( cont > 0 ? ";" : "")

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

            const q = `SELECT * FROM students LEFT JOIN presences pre ON pre.classid = ? AND idstudent = pre.studentid WHERE eventid = ?`

            db.query(q, [req.body.idclass, req.body.eventid], (err, data) => { 
                if (err) return res.status(500).json(err)

                let q = "DELETE FROM presences WHERE studentid IN ("

                let cont = 0

                for( let i = 0; i < data.length; i++ ){
                    if(data[i].idpresence != null){
                        q += ( cont > 0 ? "," : "")
                        q +=  data[i].idstudent
                        cont++
                    }
                }

                q += ( cont > 0 ? ");" : ")")

                db.query(q, (err, data) => {
                    if (err) return res.status(500).json(err)
                    return res.status(200).json("success")
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