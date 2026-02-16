import mysql from "mysql2";
import dotenv from "dotenv"

dotenv.config()

const conexao = mysql.createConnection({
    host: process.env.DB_HOST_SQL,
    user: process.env.DB_USER_SQL,
    password: process.env.SQL_KEY_ACESS,
    database: process.env.DB_NAME_SQL
});


export default conexao;