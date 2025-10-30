'use client'

import Form from "@/components/form-kit/context"
import TextField from "@/components/form-kit/fields/text-field"
import SelectField from "@/components/form-kit/fields/select/select-field"

import { useEffect, useState } from "react"
import { Response } from "@/types/server"
import { getRouteOptions } from "@/actions/routes"
import { FieldValue, Option } from "@/components/form-kit/types"
import { useNotificationContext } from "@/components/notifications/context"

const passengerTypeOptions: Option[] = [
    { id: 1, label: "Municipal" },
    { id: 2, label: "Estadual" },
    { id: 3, label: "Caronista" }
]

interface Props {
    setFilters: (filter: Record<string, string | number | Date | null>) => void
}

export default function PassengersFilterForm({ setFilters }: Props) {
    const [routeOptions, setRouteOptions] = useState<Option[]>([])

    const { sendNotification } = useNotificationContext()

    // Buscar opções de rotas para SelectFields
    const fetchRouteOptions = async (): Promise<void> => {
        const res: Response<{ routeOptions: Option[] }> = await getRouteOptions()

        if (res.ok) {
            return setRouteOptions(res.data!.routeOptions)
        }

        return sendNotification({ message: "Erro ao buscar rotas!", type: "Error" })
    }

    const onSubmit = (formData: Record<string, FieldValue>) => {
        const filters: Record<string, string | number | Date | null> = {
            wordFilter: formData.wordFilter as string || null,
            passengerType: (formData.typeFilter as Option)?.label || null,
            outboundRouteId: (formData.outboundRouteFilter as Option)?.id || null,
            returnRouteId: (formData.returnRouteFilter as Option)?.id || null
        }

        setFilters(filters)
    }

    useEffect(() => {
        fetchRouteOptions()
    }, [])

    return (
        <Form
            className="grid grid-cols-5 max-lg:grid-cols-1 gap-4"
            onSubmit={onSubmit}
        >
            <TextField
                name="wordFilter"
                placeholder="Filtrar por texto"
            />

            <SelectField
                name="typeFilter"
                placeholder="Tipo de passageiro"
                options={passengerTypeOptions}
            />

            <SelectField
                name="outboundRouteFilter"
                placeholder="Rota de ida"
                options={routeOptions}
            />

            <SelectField
                name="returnRouteFilter"
                placeholder="Rota de retorno"
                options={routeOptions}
            />

            <button
                type="submit"
                className="bg-contrast-2 hover:bg-contrast-1 text-black hover:text-gray-300 cursor-pointer rounded-sm transition-all"
            >
                Filtrar
            </button>
        </Form>
    )
}