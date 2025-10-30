'use client'

import Form from "@/components/form-kit/context"
import SelectField from "@/components/form-kit/fields/select/select-field"
import TextField from "@/components/form-kit/fields/text-field"

import { Response } from "@/types/server"
import { useEffect, useState } from "react"
import { getDriverOptions } from "@/actions/routes"
import { FieldValue, Option } from "@/components/form-kit/types"
import { useNotificationContext } from "@/components/notifications/context"

interface Props {
    setFilters: (filters: Record<string, string | null>) => void
    setPage: (page: number) => void
}

export default function RoutesFilterForm({ setFilters, setPage }: Props) {
    const [driverOptions, setDriverOptions] = useState<Option[]>([])

    const { sendNotification } = useNotificationContext()

    const fetchDrivers = async (): Promise<void> => {
        const res: Response<{ driverOptions: Option[] }> = await getDriverOptions()

        if (!res.ok) return sendNotification({ message: "Erro ao buscar motoristas!", type: "Error" })

        return setDriverOptions(res.data!.driverOptions)
    }

    const onSubmit = (formData: Record<string, FieldValue>) => {
        const filters: Record<string, string | null> = {
            wordFilter: (formData.wordFilter as string) || null,
            driverFilter: (formData.driverFilter as Option)?.label || null
        }

        setPage(1)
        setFilters(filters)
    }

    useEffect(() => {
        fetchDrivers()
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
                name="driverFilter"
                placeholder="Motorista"
                options={driverOptions}
            />

            <button
                type="submit"
                className="bg-contrast-2 hover:bg-contrast-1 text-black hover:text-gray-300
                cursor-pointer rounded-sm transition-all min-lg:col-start-5"
            >
                Filtrar
            </button>
        </Form>
    )
}