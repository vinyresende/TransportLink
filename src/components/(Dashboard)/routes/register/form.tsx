'use client'

import Form from "@/components/form-kit/context"
import TextField from "@/components/form-kit/fields/text-field"
import NumberField from "@/components/form-kit/fields/number-field"
import TextAreaField from "@/components/form-kit/fields/text-area"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createRoute } from "@/actions/routes"
import { FieldValue } from "@/components/form-kit/types"

import { Response } from "@/types/server"
import { useNotificationContext } from "@/components/notifications/context"

export default function RouteRegisterForm() {
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

        const res: Response = await createRoute(payload)

        if (res.ok) {
            sendNotification({ message: "Rota cadastrada com sucesso!", type: "Success" })
            router.push("/rotas")
            return
        }

        sendNotification({ message: "Erro ao registrar rota", type: "Error" })
        return setIsPending(false)
    }

    return (
        <Form
            className="w-full flex flex-col gap-5"
            onSubmit={onSubmit}
        >
            <div>
                <h1 className="font-semibold text-2xl">Cadastrar rota de transporte</h1>
            </div>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
                <TextField
                    name="route_name"
                    label="Nome da rota *"
                    placeholder="Ex: Rota 05"
                    required
                />

                <TextField
                    name="driver"
                    label="Nome do motorista *"
                    placeholder="Ex: John Doe"
                    required
                />
            </div>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
                <TextField
                    name="vehicle_license_plate"
                    label="Placa do veículo *"
                    placeholder="Ex: ABC0D00"
                    required
                />

                <NumberField
                    name="annual_recurrence"
                    label="Recorrência anual *"
                    placeholder="Ex: 200"
                    required
                />
            </div>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
                <NumberField
                    name="distance"
                    label="Distância percorrida (KM) *"
                    placeholder="Ex: 93"
                    required
                />
            </div>

            <TextAreaField
                name="roadmap"
                label="Roteiro da viagem"
                placeholder="Locais por onde o veículo passa e informações importantes"
            />

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-contrast-2 hover:bg-contrast-1 text-black hover:text-gray-300
                    cursor-pointer rounded-sm transition-all min-lg:col-start-5 px-10 py-3"
                >
                    Salvar
                </button>
            </div>
        </Form>
    )
}