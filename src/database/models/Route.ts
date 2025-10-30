import { Model } from "sequelize"
import { database } from "../database"

import sequelize from "sequelize"

class Route extends Model {
    declare id: number
    declare name: string
    declare driver: string
    declare vehicle_license_plate: string
    declare annual_recurrence: number
    declare distance: number
    declare roadmap: string | null

    declare createdAt: Date | null
    declare updatedAt: Date | null
}

Route.init({
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    driver: {
        type: sequelize.STRING,
        allowNull: false
    },
    vehicle_license_plate: {
        type: sequelize.STRING,
        allowNull: false
    },
    annual_recurrence: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    distance: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    roadmap: {
        type: sequelize.TEXT,
        allowNull: true
    },
    createdAt: {
        type: sequelize.DATE,
        allowNull: true
    },
    updatedAt: {
        type: sequelize.DATE,
        allowNull: true
    }
}, {
    tableName: "route",
    sequelize: database
})

export default Route
