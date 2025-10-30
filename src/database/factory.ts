import { database } from "./database"
import { Attributes, Op, Sequelize } from "sequelize"

import { Response } from "@/types/server"

import User from "./models/User"
import Route from "./models/Route"
import Passenger from "./models/Passenger"

class DatabaseFactory {
    private sequelize: Sequelize

    constructor() {
        this.sequelize = database
        this.sequelize.sync()
    }

    // CREATE

    async createRoute(info: Attributes<Route>): Promise<Response> {
        try {
            await Route.create(info)
            return { ok: true, status: 200 }
        } catch (err) {
            return { ok: false, status: 500, error: err }
        }
    }

    async createPassenger(info: Attributes<Passenger>): Promise<Response> {
        try {
            await Passenger.create(info)
            return { ok: true, status: 200 }
        } catch (err) {
            return { ok: false, status: 500, error: err }
        }
    }

    async createUser(info: Attributes<User>): Promise<Response> {
        try {
            await User.create(info)
            return { ok: true, status: 200 }
        } catch (err) {
            return { ok: false, status: 500, error: err }
        }
    }

    // GET

    async getUserByEmail(email: string): Promise<Response<{ user: User | null }>> {
        try {
            const user: User | null = await User.findOne({ where: { email }, raw: true })
            return { ok: true, status: 200, data: { user: user } }
        } catch (err) {
            return { ok: false, status: 500, error: err }
        }
    }

    async getRoutes(
        filter?: Record<string, string | null>,
        page: number = 1,
        limit: number = 10
    ): Promise<Response<{ routes: Route[], page: number, total: number }>> {
        try {
            const { rows, count }: { rows: Route[], count: number } = await Route.findAndCountAll({
                where: {
                    ...filter?.wordFilter ? {
                        [Op.or]: {
                            name: { [Op.like]: `%${filter?.wordFilter}%` },
                            vehicle_license_plate: { [Op.like]: `%${filter?.wordFilter}%` },
                            distance: { [Op.like]: `%${filter?.wordFilter}%` }
                        },
                    } : {},
                    ...filter?.driverFilter ? { driver: filter?.driverFilter } : {},
                },
                raw: true,
                offset: (page - 1) * limit,
                limit,
            })
            return { ok: true, status: 200, data: { routes: rows, page, total: count } }
        } catch (err) {
            return { ok: false, status: 500, error: err }
        }
    }

    async getPassengers(
        filter?: Record<string, string | number | Date | null>,
        page: number = 1,
        limit: number = 10
    ): Promise<Response<{ passengers: Passenger[], page: number, total: number }>> {
        try {
            const { rows, count }: { rows: Passenger[], count: number } = await Passenger.findAndCountAll({
                where: {
                    ...filter?.wordFilter ? {
                        [Op.or]: {
                            name: { [Op.like]: `%${filter?.wordFilter}%` },
                            destination: { [Op.like]: `%${filter?.wordFilter}%` }
                        },
                    } : {},
                    ...filter?.outboundRouteId ? { outbound_route_id: filter?.outboundRouteId } : {},
                    ...filter?.returnRouteId ? { return_route_id: filter?.returnRouteId } : {}
                },
                include: [
                    { model: Route, as: "outboundRoute" },
                    { model: Route, as: "returnRoute" }
                ],
                raw: true,
                nest: true,
                offset: (page - 1) * limit,
                limit,
            })
            return { ok: true, status: 200, data: { passengers: rows, page, total: count } }
        } catch (err) {
            return { ok: false, status: 500, error: err }
        }
    }

    async getRecentPassengers(): Promise<Response<{ passengers: Passenger[] }>> {
        try {
            const passengers: Passenger[] = await Passenger.findAll({
                limit: 10,
                order: [["createdAt", "DESC"]],
                include: [
                    { model: Route, as: "outboundRoute" },
                    { model: Route, as: "returnRoute" }
                ],
                raw: true,
                nest: true
            })
            return { ok: true, status: 200, data: { passengers } }
        } catch (err) {
            return { ok: false, status: 500, error: err }
        }
    }

    async getCounts(): Promise<Response<Record<string, number>>> {
        try {
            const municipalPassengers: number = await Passenger.count({ where: { type: "Municipal" } })
            const statePassengers: number = await Passenger.count({ where: { type: "Estadual" } })
            const hitchhikers: number = await Passenger.count({ where: { type: "Caronista" } })
            const routes: number = await Route.count()

            return { ok: true, status: 200, data: { routes, municipalPassengers, statePassengers, hitchhikers } }
        } catch (err) {
            return { ok: false, status: 500, error: err }
        }
    }

    async getPassengerById(id: number): Promise<Response<{ passenger: Passenger | null }>> {
        try {
            const passenger: Passenger | null = await Passenger.findOne({
                where: { id },
                include: [
                    { model: Route, as: "outboundRoute" },
                    { model: Route, as: "returnRoute" }
                ],
                raw: true,
                nest: true
            })
            return { ok: true, status: 200, data: { passenger } }
        } catch (err) {
            return { ok: false, status: 500, error: err }
        }
    }

    async getRouteById(id: number): Promise<Response<{ route: Route | null }>> {
        try {
            const route: Route | null = await Route.findOne({
                where: { id },
                raw: true
            })
            return { ok: true, status: 200, data: { route } }
        } catch (err) {
            return { ok: false, status: 500, error: err }
        }
    }

    async getDrivers(): Promise<Response<{ drivers: string[] }>> {
        try {
            const routes: Route[] = await Route.findAll({ attributes: ["driver"] })
            const drivers: string[] = Array.from(new Set(routes.map(r => { return r.driver })))

            return { ok: true, status: 200, data: { drivers } }
        } catch (err) {
            return { ok: false, status: 500, error: err }
        }
    }

    // UPDATE

    async editPassenger(id: number, info: Attributes<Passenger>): Promise<Response> {
        try {
            const passenger: Passenger | null = await Passenger.findByPk(id)
            await passenger?.update(info)

            return { ok: true, status: 200 }
        } catch (err) {
            return { ok: false, status: 500, error: err }
        }
    }

    async editRoute(id: number, info: Attributes<Route>): Promise<Response> {
        try {
            const route: Route | null = await Route.findByPk(id)
            await route?.update(info)

            return { ok: true, status: 200 }
        } catch (err) {
            return { ok: false, status: 500, error: err }
        }
    }

    // DELETE

    async deletePassenger(id: number): Promise<Response> {
        try {
            const passenger: Passenger | null = await Passenger.findByPk(id)
            await passenger?.destroy()

            return { ok: true, status: 200 }
        } catch (err) {
            return { ok: false, status: 500, error: err }
        }
    }

    async deleteRoute(id: number): Promise<Response> {
        try {
            const route: Route | null = await Route.findByPk(id)
            await route?.destroy()

            return { ok: true, status: 200 }
        } catch (err) {
            return { ok: false, status: 500, error: err }
        }
    }
}

const fac = new DatabaseFactory()

export default fac
