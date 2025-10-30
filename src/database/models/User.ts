import { Model } from "sequelize"
import { database } from "../database"

import sequelize from "sequelize"

class User extends Model {
    declare id: number
    declare username: string
    declare email: string
    declare password: string
}

User.init({
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: sequelize.STRING(25),
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: "user",
    sequelize: database,
    timestamps: false
})

export default User
