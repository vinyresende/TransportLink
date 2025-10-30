"use server"


import fac from "@/database/factory"
import { Response } from "@/types/server"

export async function getCounts(): Promise<Response> {
    try {
        const res: Response = await fac.getCounts()

        if (!res.ok) { throw new Error("Erro ao buscar passageiro!") }

        return { ok: true, status: 200, data: res.data }
    } catch (err) {
        return { ok: false, status: 500, error: err }
    }
}