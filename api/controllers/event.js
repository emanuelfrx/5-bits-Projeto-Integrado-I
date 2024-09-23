import moment from "moment/moment.js";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getEvents = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        //if (adminInfo.role != 0) return res.status(403).json("User have not permision")
        // verificar a escolha de ser apenas para o admin que cadastrou
        const q = `SELECT * FROM events AS e LEFT JOIN admins AS a on e.adminid = a.idadmin WHERE ? = e.adminid`

        db.query(q, [adminInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })

    })

}

export const getEvent = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        //if (adminInfo.role != 0) return res.status(403).json("User have not permision")

        const q = `SELECT * FROM events AS e WHERE ? = e.idevent`

        db.query(q, [req.params.idevent], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data[0])
        })

    })

}

export const addEvent = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        if (adminInfo.role == 0) return res.status(403).json("User have not permision")

        const q = "INSERT INTO events (`title`, `desc`, `tag_link`, `img_event`, `date_ini`, `date_end`, `createdAt`, `adminid`) VALUES (?)"

        if (req.body.title == "") return res.status(401).json("Preencha todos os Campos!")
        if (req.body.desc == "") return res.status(401).json("Preencha todos os Campos!")
        if (req.body.tag_link == "") return res.status(401).json("Preencha todos os Campos!")
        if (req.body.img_event == "") return res.status(401).json("Preencha todos os Campos!")
        if (req.body.date_ini == "") return res.status(401).json("Preencha todos os Campos!")
        if (req.body.date_end == "") return res.status(401).json("Preencha todos os Campos!")

        const values = [
            req.body.title,
            req.body.desc,
            req.body.tag_link,
            req.body.img_event,
            req.body.date_ini,
            req.body.date_end,
            moment(Date.now()).format("YYYY-MM-DD ss::mm::HH"),
            adminInfo.id
        ]


        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(values)
            return res.status(200).json(data.insertId)
        })

    })

}

//Not working
export const updateEvent = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        if (adminInfo.role == 0) return res.status(403).json("User have not permision")

        const q = "UPDATE events SET title = ? , desc = ? , tag_link = ? , img_event = ? , createdAt = ?, adminid = ? WHERE idevent = ?"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.tag_link,
            req.body.img_event,
            moment(Date.now()).format("DD-MM-YYYY ss::mm::HH"),
            adminInfo.id,
            req.body.idevent
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(values)
            return res.status(200).json("Event has been updated")
        })

    })

}

export const checkEvent = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = `SELECT * FROM events AS e WHERE ? = e.tag_link`

        //Necessary Defense Bad Requests

        db.query(q, req.body.tag_link, (err, data) => {
            if (err) return res.status(500).json(req.body)

            if (data.length <= 0) return res.status(404).json("Tag Link not found!")

            return res.status(200).json(data[0])
        })

    })

}

export const deleteEvent = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        if (adminInfo.role == 0) return res.status(403).json("User have not permision")

        const q = "DELETE FROM events WHERE events.idevent = ?"

        db.query(q, [req.body.idevent], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Evento Deletado com Sucesso!")
        })

    })
}

export const infochartEvent = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = "SELECT * FROM students WHERE students.eventid = ?"

        db.query(q, [req.body.idevent], (err, data) => {
            if (err) return res.status(500).json(err)

            const tot = data.length

            const q = "SELECT * FROM students WHERE students.accredited = 1 AND students.eventid = ?"


            db.query(q, [req.body.idevent], (err, data) => {
                if (err) return res.status(500).json(err)

                const tot_accredited = data.length

                const infochart = [
                    { name: 'Participantes credenciados', value: tot_accredited },
                    { name: 'Participantes não credenciados', value: tot - tot_accredited },
                ];

                return res.status(200).json(infochart)
            })
        })

    })
}

export const infoChart = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(500).json(err)

        //todos os eventos, mesmo os que nao foram o dado admin que cadastrou

        const q = "SELECT * FROM events WHERE adminid = ?"

        db.query(q, [adminInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)

            const resp = {
                title: "-",
                num_students: 0,
                num_lectures: 0,
                num_presences: 0,
                num_certificates: 0
            }

            if (data.length == 0) {
                return res.status(200).json(resp)
            }

            const event = data[data.length - 1]

            resp.title = event.title

            const q = "SELECT * FROM students WHERE eventid = ?"

            db.query(q, [event.idevent], (err, data) => {
                if (err) return res.status(500).json(err)

                resp.num_students = data.length

                const q = "SELECT * FROM lectures WHERE eventid = ?"

                db.query(q, [event.idevent], (err, data) => {
                    if (err) return res.status(500).json(err)

                    resp.num_lectures = data.length

                    //falta presencas e certificados

                    return res.status(200).json(resp)

                })
            })
        })

    })
}