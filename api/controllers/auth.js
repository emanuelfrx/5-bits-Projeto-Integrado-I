import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = (req, res) => {

    const q = "SELECT * FROM admins WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if(err) return res.status(500).json(err)

        if(data.length <= 0) return res.status(404).json("User not found!")

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if(!checkPassword) return res.status(400).json("Wrong password or username!")

        const token = jwt.sign({id:data[0].idadmin, role:data[0].role}, "secretkey")

        const {password, ...others} = data[0]

        res.cookie("accessToken", token, {
            httpOnly : true
        }).status(200).json({role:data[0].role, body:others})

    })
}

export const register = (req, res) => {

    //Check User
    const q = "SELECT * FROM admins WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) return res.status(409).json("User already exists!")

        // Create a new User
        // Hash passoword
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt)

        const q = "INSERT INTO admins (`username`, `email`, `password`, `name`) VALUE (?)"

        const values = [req.body.username, req.body.email, hashPassword, req.body.name]

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err)

            return res.status(200).json("User has been created.")
        })

    })

} //Cookie não está sendo removido !!! Duplo carregamento em algumas paginas !!! Current user não está sendo setado.

export const logout = (req, res) => {

    return res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logout")
}