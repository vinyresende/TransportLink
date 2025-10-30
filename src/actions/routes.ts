'use server'

import fac from "@/database/factory"
import Route from "@/database/models/Route"

import { Attributes } from "sequelize"
import { Response } from "@/types/server"
import { FieldValue, Option } from "@/components/form-kit/types"

export async function createRoute(info: Attributes<Route>): Promise<Response> {
    try {
        const res: Response = await fac.createRoute(info)

        if (!res.ok) { throw new Error("Erro ao criar rota!") }

        return { ok: true, status: 200 }
    } catch (err) {
        return { ok: false, status: 500, error: err }
    }
}

export async function getRoutes(filter?: Record<string, string | null>, page: number = 1, limit: number = 10): Promise<Response> {
    try {
        const res: Response<{ routes: Route[], page: number, total: number }> = await fac.getRoutes(filter, page, limit)

        if (!res.ok) { throw new Error("Erro ao buscar rotas!") }

        return { ok: true, status: 200, data: res.data }
    } catch (err) {
        return { ok: false, status: 500, error: err }
    }
}

export async function getRouteOptions(): Promise<Response<{ routeOptions: Option[] }>> {
    try {
        const res: Response<{ routes: Route[] }> = await fac.getRoutes()

        if (!res.ok) { throw new Error("Erro ao buscar rotas!") }

        const routeOptions: Option[] = res.data!.routes.map(obj => {
            return { id: obj.id, label: obj.name, sublabel: obj.driver }
        })

        return { ok: true, status: 200, data: { routeOptions } }
    } catch (err) {
        return { ok: false, status: 500, error: err }
    }
}

export async function getDriverOptions(): Promise<Response<{ driverOptions: Option[] }>> {
    try {
        const res: Response<{ drivers: string[] }> = await fac.getDrivers()

        if (!res.ok) { throw new Error("Erro ao buscar motoristas!") }

        const driverOptions: Option[] = res.data!.drivers.map((d, i) => { return { id: i, label: d } })

        return { ok: true, status: 200, data: { driverOptions } }
    } catch (err) {
        return { ok: false, status: 500, error: err }
    }
}

// Unique route

export async function fetchRouteById(id: number): Promise<Response<{ route: Route | null }>> {
    try {
        const res: Response<{ route: Route | null }> = await fac.getRouteById(id)

        if (!res.ok) { throw new Error("Erro ao buscar rota!") }

        return { ok: true, status: 200, data: res.data }
    } catch (err) {
        return { ok: false, status: 500, error: err }
    }
}

export async function updateRoute(id: number, info: Record<string, FieldValue>): Promise<Response> {
    try {
        const res: Response = await fac.editRoute(id, info)

        if (!res.ok) { throw new Error("Erro ao editar rota!") }

        return { ok: true, status: 200, data: res.data }
    } catch (err) {
        return { ok: false, status: 500, error: err }
    }
}

export async function deleteRoute(id: number): Promise<Response> {
    try {
        const res: Response = await fac.deleteRoute(id)

        if (!res.ok) { throw new Error("Erro ao remover rota!") }

        return { ok: true, status: 200, data: res.data }
    } catch (err) {
        return { ok: false, status: 500, error: err }
    }
}
