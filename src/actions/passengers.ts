'use server'

import path from "path"
import * as fs from "fs"
import fac from "@/database/factory"
import Passenger from "@/database/models/Passenger"

import { Attributes } from "sequelize"
import { Response } from "@/types/server"
import { FieldValue } from "@/components/form-kit/types"
import { Passenger as PassengerType } from "@/types/passengers"

import { patchDocument, TextRun } from "docx"

export async function createPassenger(info: Attributes<Passenger>): Promise<Response> {
    try {
        const res: Response = await fac.createPassenger(info)

        if (!res.ok) { throw new Error("Erro ao cadastrar passageiro!") }

        return { ok: true, status: 200 }
    } catch (err) {
        return { ok: false, status: 500, error: err }
    }
}

export async function getPassengers(filter?: Record<string, string | number | Date | null>, page: number = 1, limit: number = 10): Promise<Response> {
    try {
        const res: Response<{ passengers: Passenger[] }> = await fac.getPassengers(filter, page, limit)

        if (!res.ok) { throw new Error("Erro ao buscar passageiro!") }

        return { ok: true, status: 200, data: res.data }
    } catch (err) {
        return { ok: false, status: 500, error: err }
    }
}

export async function getRecentPassengers(): Promise<Response> {
    try {
        const res: Response<{ passengers: Passenger[] }> = await fac.getRecentPassengers()

        if (!res.ok) { throw new Error("Erro ao buscar passageiro!") }

        return { ok: true, status: 200, data: res.data }
    } catch (err) {
        return { ok: false, status: 500, error: err }
    }
}

// Unique passenger

export async function fetchPassengerById(id: number): Promise<Response> {
    try {
        const res: Response<{ passenger: Passenger | null }> = await fac.getPassengerById(id)

        if (!res.ok) { throw new Error("Erro ao buscar passageiro!") }

        return { ok: true, status: 200, data: res.data }
    } catch (err) {
        return { ok: false, status: 500, error: err }
    }
}

export async function updatePassenger(id: number, info: Record<string, FieldValue>): Promise<Response> {
    try {
        const res: Response = await fac.editPassenger(id, info)

        if (!res.ok) { throw new Error("Erro ao editar passageiro!") }

        return { ok: true, status: 200, data: res.data }
    } catch (err) {
        return { ok: false, status: 500, error: err }
    }
}

export async function deletePassenger(id: number): Promise<Response> {
    try {
        const res: Response = await fac.deletePassenger(id)

        if (!res.ok) { throw new Error("Erro ao remover passageiro!") }

        return { ok: true, status: 200, data: res.data }
    } catch (err) {
        return { ok: false, status: 500, error: err }
    }
}

// File
export async function genFormDocument(info: PassengerType): Promise<Response<{ doc: Blob }>> {
    try {
        const buffer: NonSharedBuffer = fs.readFileSync(path.join(process.cwd(), "public", "form-template.docx"))

        if (!buffer) {
            throw new Error("Erro ao encontrar template de ficha!")
        }

        const dateString: string = new Date(`${info.date_of_birth}T00:00:00`).toLocaleDateString("pt-BR")
        const cpf: string = info.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
        const rg: string | null = info.rg ? info.rg.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2.$3") : null
        const cep: string = info.postal_code.replace(/(\d{5})(\d{3})/, "$1-$2")
        const phone: string = info.phone.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")
        const specialNeeds: string = info.special_needs ? "OBS: Passageiro portador de necessidades especiais" : ""

        const doc: Blob = await patchDocument({
            outputType: "blob",
            data: buffer,
            patches: {
                name: {
                    type: "paragraph",
                    children: [new TextRun(info.name)]
                },
                birth_date: {
                    type: "paragraph",
                    children: [new TextRun(dateString)]
                },
                father_name: {
                    type: "paragraph",
                    children: [new TextRun(info.father_name || "")]
                },
                mother_name: {
                    type: "paragraph",
                    children: [new TextRun(info.mother_name || "")]
                },
                address_line: {
                    type: "paragraph",
                    children: [new TextRun(info.address_line)]
                },
                city: {
                    type: "paragraph",
                    children: [new TextRun(info.city)]
                },
                neighborhood: {
                    type: "paragraph",
                    children: [new TextRun(info.neighborhood)]
                },
                cep: {
                    type: "paragraph",
                    children: [new TextRun(cep)]
                },
                email: {
                    type: "paragraph",
                    children: [new TextRun(info.email || "")]
                },
                phone: {
                    type: "paragraph",
                    children: [new TextRun(phone)]
                },
                rg: {
                    type: "paragraph",
                    children: [new TextRun(rg || "")]
                },
                cpf: {
                    type: "paragraph",
                    children: [new TextRun(cpf)]
                },
                course: {
                    type: "paragraph",
                    children: [new TextRun(info.course || "")]
                },
                destination: {
                    type: "paragraph",
                    children: [new TextRun(info.destination)]
                },
                special_needs: {
                    type: "paragraph",
                    children: [new TextRun(specialNeeds)]
                }
            }
        })

        return { ok: true, status: 200, data: { doc } }
    } catch (err) {
        return { ok: false, status: 500, error: err }
    }
}
