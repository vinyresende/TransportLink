import mysql2 from "mysql2"
import { Sequelize } from "sequelize"

const database: Sequelize = new Sequelize({
    host: process.env.DB_HOST || "",
    database: process.env.DB_NAME || "",
    username: process.env.DB_USER || "",
    password: process.env.DB_PASS || "",
    dialect: "mysql",
    dialectModule: mysql2
})

export { database }
