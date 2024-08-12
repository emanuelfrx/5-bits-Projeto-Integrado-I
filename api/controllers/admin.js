import moment from "moment/moment.js";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const authorizationMonitorEvent = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")
        if (adminInfo.role == 0) return res.status(403).json("User have not permision")

        const q = "SELECT * FROM authorization_events AS auth WHERE auth.adminid = ? AND auth.eventid = ?"

        const values = [
            req.body.idadmin,
            req.body.idevent
        ]

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err)

            let q

            if (data.length > 0) {
                q = "DELETE FROM authorization_events AS auth WHERE auth.adminid = ? AND auth.eventid = ?"
                db.query(q, values, (err, data) => {
                    if (err) return res.status(500).json(err)

                    res.status(200).json("Auth changed success!")
                })
            } else {
                q = "INSERT INTO authorization_events (`adminid`, `eventid`) VALUES (?)"
                db.query(q, [values], (err, data) => {
                    if (err) return res.status(500).json(err)

                    res.status(200).json("Auth changed success!")
                })
            }
        })
    })

}

export const getMonitors = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")
        if (adminInfo.role == 0) return res.status(403).json("User have not permision")

        const q = `SELECT * FROM admins ad
                   LEFT JOIN authorization_events auth
                   ON auth.eventid = ? AND idadmin = auth.adminid
                   WHERE role = 0`

        db.query(q, [req.params.idevent], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })

    })
}

export const getAdmins = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")
        if (adminInfo.role == 0) return res.status(403).json("User have not permision")

        const q = `SELECT * FROM admins`

        db.query(q, [adminInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })

    })

}

export const addAdmin = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")
        if (adminInfo.role == 0) return res.status(403).json("User have not permision") 

        //Check User
        const q = "SELECT * FROM admins WHERE username = ?"

        db.query(q, [req.body.inputs.username], (err, data) => {
            if (err) return res.status(500).json(err)
            if (data.length) return res.status(409).json("User already exists!")

            // Create a new User
            // Hash passoword
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(req.body.inputs.password, salt)

            const q = "INSERT INTO admins (`username`, `email`, `password`, `name`, `role`) VALUE (?)"

            const values = [req.body.inputs.username, req.body.inputs.email, hashPassword, req.body.inputs.name, req.body.inputs.role]

            db.query(q, [values], (err, data) => {
                if (err) return res.status(500).json(err)

                return res.status(200).json("User has been created.")
            })

        })

    })

}

export const updateAdmin = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")
        if (adminInfo.role == 0) return res.status(403).json("User have not permision")    

        //Check User
        const q = "SELECT * FROM admins WHERE username = ?"

        db.query(q, [req.body.inputs.username], (err, data) => {
            if (err) return res.status(500).json(err)

            // Create a new User
            // Hash passoword
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(req.body.inputs.password, salt)

            const q = "UPDATE admins SET `username` = ?, `email` = ?, `password` = ?, `name` = ?, `role` = ? WHERE idadmin = ?"

            const values = [req.body.inputs.username, req.body.inputs.email, hashPassword, req.body.inputs.name, req.body.inputs.role]

            console.log(...values)
            console.log(req.params.idadmin)

            db.query(q, [...values, req.params.idadmin], (err, data) => {
                if (err) return res.status(500).json(err)

                return res.status(200).json("User has been created.")
            })

        })

    })

}

export const deleteAdmin = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, adminInfo) => {
        if (err) return res.status(403).json("Token is not valid!")
        if (adminInfo.role == 0) return res.status(403).json("User have not permision")    

        const q = "DELETE FROM admins WHERE idadmin = ?"

        db.query(q, [req.params.idadmin], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("User deleted!")
        })

    })
}