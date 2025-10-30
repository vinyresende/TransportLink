import { Model } from "sequelize"
import { database } from "../database"

import sequelize from "sequelize"
import Route from "./Route"

class Passenger extends Model {
    declare id: number
    declare name: string
    declare type: string
    declare mother_name: string | null
    declare father_name: string | null
    declare date_of_birth: Date
    declare address_line: string
    declare neighborhood: string
    declare city: string
    declare postal_code: string
    declare cpf: string
    declare rg: string | null
    declare email: string | null
    declare phone: string
    declare course: string | null
    declare destination: string
    declare special_needs: boolean
    declare outbound_route_id: string | null
    declare return_route_id: string | null

    // timestamps
    declare readonly createdAt?: Date
    declare readonly updatedAt?: Date

    // atribuições
    declare outboundRoute?: Route
    declare returnRoute?: Route
}

Passenger.init({
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    type: {
        type: sequelize.STRING,
        allowNull: false
    },
    mother_name: {
        type: sequelize.STRING,
        allowNull: true
    },
    father_name: {
        type: sequelize.STRING,
        allowNull: true
    },
    date_of_birth: {
        type: sequelize.DATEONLY,
        allowNull: false
    },
    address_line: {
        type: sequelize.STRING,
        allowNull: false
    },
    neighborhood: {
        type: sequelize.STRING,
        allowNull: false
    },
    city: {
        type: sequelize.STRING,
        allowNull: false
    },
    postal_code: {
        type: sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: sequelize.STRING,
        allowNull: false
    },
    rg: {
        type: sequelize.STRING,
        allowNull: true
    },
    email: {
        type: sequelize.STRING,
        allowNull: true
    },
    phone: {
        type: sequelize.STRING,
        allowNull: false
    },
    course: {
        type: sequelize.STRING,
        allowNull: true
    },
    destination: {
        type: sequelize.STRING,
        allowNull: false
    },
    special_needs: {
        type: sequelize.BOOLEAN,
        allowNull: false
    },
    outbound_route_id: {
        type: sequelize.INTEGER,
        allowNull: true,
        references: {
            model: "route",
            key: "id"
        }
    },
    return_route_id: {
        type: sequelize.INTEGER,
        allowNull: true,
        references: {
            model: "route",
            key: "id"
        }
    }
}, {
    tableName: "passenger",
    sequelize: database
})

Passenger.belongsTo(Route, {
    foreignKey: "outbound_route_id",
    as: "outboundRoute",
    onDelete: "SET NULL"
})

Passenger.belongsTo(Route, {
    foreignKey: "return_route_id",
    as: "returnRoute",
    onDelete: "SET NULL"
})

export default Passenger
