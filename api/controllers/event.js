import moment from "moment/moment.js";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getEvents = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).son("Token is not valid!")

        const q = `SELECT * FROM events AS e WHERE ? = e.adminid`

        db.query(q, [adminInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })

    })

}

export const addEvent = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).son("Token is not valid!")

        const q = "INSERT INTO events (`title`, `desc`, `tag_link`, `img_event`, `createdAt`, `adminid`) VALUES (?)"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.tag_link,
            req.body.img_event,
            moment(Date.now()).format("DD-MM-YYYY ss::mm::HH"),
            adminInfo.id
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(values)
            return res.status(200).json("Event has been created")
        })

    })

}

export const checkEvent = (req, res) => {

    const q = `SELECT * FROM events AS e WHERE ? = e.tag_link`

    //Necessary Defense Bad Requests

    db.query(q, req.body.tag_link, (err, data) => {
        if (err) return res.status(500).json(req.body)

        if(data.length <= 0) return res.status(404).json("Tag Link not found!")

        return res.status(200).json(data[0])
    })



}