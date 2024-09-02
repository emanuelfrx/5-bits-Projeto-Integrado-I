import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password:"gtkm1234",
    database:"fivebits"
})