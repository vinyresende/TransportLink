'use client'

import Link from "next/link"
import Form from "@/components/form-kit/context"
import TextField from "@/components/form-kit/fields/text-field"
import NumberField from "@/components/form-kit/fields/number-field"
import TextAreaField from "@/components/form-kit/fields/text-area"

import { useState } from "react"
import { GoTrash } from "react-icons/go"
import { useRouter } from "next/navigation"
import { FieldValue } from "@/components/form-kit/types"
import { deleteRoute, updateRoute } from "@/actions/routes"

import { Route } from "@/types/routes"
import { Response } from "@/types/server"
import { useNotificationContext } from "@/components/notifications/context"

interface Props {
    info: Route
}

export default function RouteEditForm({ info }: Props) {
    const router = useRouter()

    const [isPending, setIsPending] = useState<boolean>(false)

    const { sendNotification } = useNotificationContext()

    const onSubmit = async (formData: Record<string, FieldValue>) => {
        if (isPending) return

        setIsPending(true)

        const payload: Record<string, FieldValue> = {
            ...formData,
            name: formData.route_name
        }

        const res: Response = await updateRoute(info.id, payload)

        if (res.ok) {
            sendNotification({ message: "Rota editada com sucesso!", type: "Success" })
            router.push("/rotas")
            return
        }

        sendNotification({ message: "Erro ao editar rota", type: "Error" })
        return setIsPending(false)
    }

    // Delete
    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault()

        const res: Response = await deleteRoute(info.id)

        if (res.ok) {
            sendNotification({ message: "Rota deletada com sucesso!", type: "Success" })
            router.push("/rotas")
            return
        }

        return sendNotification({ message: "Erro ao deletar rota!", type: "Error" })
    }

    return (
        <Form
            className="w-full flex flex-col gap-5"
            onSubmit={onSubmit}
        >
            <div>
                <h1 className="font-semibold text-2xl">Editar rota de transporte</h1>
            </div>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
                <TextField
                    name="route_name"
                    label="Nome da rota *"
                    placeholder="Ex: Rota 05"
                    initialValue={info.name}
                    required
                />

                <TextField
                    name="driver"
                    label="Nome do motorista *"
                    placeholder="Ex: John Doe"
                    initialValue={info.driver}
                    required
                />
            </div>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
                <TextField
                    name="vehicle_license_plate"
                    label="Placa do veículo *"
                    placeholder="Ex: ABC0D00"
                    initialValue={info.vehicle_license_plate}
                    required
                />

                <NumberField
                    name="annual_recurrence"
                    label="Recorrência anual *"
                    placeholder="Ex: 200"
                    initialValue={info.annual_recurrence}
                    required
                />
            </div>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
                <NumberField
                    name="distance"
                    label="Distância percorrida (KM) *"
                    placeholder="Ex: 93"
                    initialValue={info.distance}
                    required
                />
            </div>

            <TextAreaField
                name="roadmap"
                label="Roteiro da viagem"
                placeholder="Locais por onde o veículo passa e informações importantes"
                initialValue={info.roadmap || ""}
            />

            <div className="flex max-lg:flex-col justify-between">
                <div>
                    <button
                        type="button"
                        className="bg-contrast-2 hover:bg-red-500 text-black hover:text-gray-300
                        cursor-pointer rounded-sm transition-all min-lg:col-start-5 px-10 py-3"
                        tabIndex={-1}
                        onClick={handleDelete}
                    >
                        <div className="flex items-center gap-2">
                            <GoTrash size={20} />
                            Deletar
                        </div>
                    </button>
                </div>

                <div className="flex gap-3">
                    <Link href="/rotas"
                        className="bg-contrast-2 hover:bg-contrast-1 text-black hover:text-gray-300
                        cursor-pointer rounded-sm transition-all min-lg:col-start-5 px-10 py-3"
                    >
                        Cancelar
                    </Link>

                    <button
                        type="submit"
                        className="bg-contrast-2 hover:bg-contrast-1 text-black hover:text-gray-300
                        cursor-pointer rounded-sm transition-all min-lg:col-start-5 px-10 py-3"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </Form>
    )
}