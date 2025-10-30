'use client'

import Form from "@/components/form-kit/context"
import RGField from "@/components/form-kit/fields/rg-field"
import CheckBox from "@/components/form-kit/fields/checkbox"
import CPFField from "@/components/form-kit/fields/cpf-field"
import CEPField from "@/components/form-kit/fields/cep-field"
import DateField from "@/components/form-kit/fields/date-field"
import TextField from "@/components/form-kit/fields/text-field"
import PhoneField from "@/components/form-kit/fields/phone-field"
import EmailField from "@/components/form-kit/fields/email-field"
import SelectField from "@/components/form-kit/fields/select/select-field"

import { Response } from "@/types/server"
import { FieldValue, Option } from "@/components/form-kit/types"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getRouteOptions } from "@/actions/routes"
import { createPassenger } from "@/actions/passengers"
import { useNotificationContext } from "@/components/notifications/context"
import PersonalFields from "./personal-fields"
import AddressFields from "./address-fields"
import PassengerFields from "./passenger-fields"

const passengerTypeOptions: Option[] = [
    { id: 1, label: "Municipal" },
    { id: 2, label: "Estadual" },
    { id: 3, label: "Caronista" }
]

export default function PassengerRegisterForm() {
    const router = useRouter()

    const [isPending, setIsPending] = useState<boolean>(false)
    const [routeOptions, setRouteOptions] = useState<Option[]>([])

    const { sendNotification } = useNotificationContext()

    const onSubmit = async (formData: Record<string, FieldValue>) => {
        if (isPending) return

        setIsPending(true)

        const cep = (formData.passenger_postal_code! as string).replace(/\D/g, "")
        const cpf = (formData.passenger_cpf! as string).replace(/\D/g, "")
        const rg = (formData.passenger_rg as string).replace(/\D/g, "")
        const phone = (formData.passenger_phone as string).replace(/\D/g, "")

        const payload: Record<string, FieldValue> = {
            postal_code: cep,
            cpf: cpf,
            rg: rg,
            phone: phone,
            name: formData.passenger_name,
            type: (formData.passenger_type as Option).label,
            mother_name: formData.passenger_mother,
            father_name: formData.passenger_father,
            date_of_birth: formData.date_of_birth,
            address_line: formData.passenger_address_line,
            neighborhood: formData.passenger_neighborhood,
            city: formData.passenger_city,
            email: formData.passenger_email,
            course: formData.passenger_course,
            destination: formData.passenger_destination,
            special_needs: formData.special_needs,
            outbound_route_id: (formData.outbound_route_id as Option)?.id || null,
            return_route_id: (formData.return_route_id as Option)?.id || null,
        }

        const res = await createPassenger(payload)

        if (res.ok) {
            sendNotification({ message: "Passageiro cadastrado com sucesso!", type: "Success" })
            router.push("/passageiros")
            return
        }

        sendNotification({ message: "Erro ao cadastrar passageiro!", type: "Error" })
        setIsPending(false)
        return
    }

    const fetchRouteOptions = async (): Promise<void> => {
        const res: Response<{ routeOptions: Option[] }> = await getRouteOptions()

        if (res.ok) {
            return setRouteOptions(res.data!.routeOptions)
        }

        return sendNotification({ message: "Erro ao buscar rotas!", type: "Error" })
    }

    useEffect(() => {
        fetchRouteOptions()
    }, [])

    return (
        <Form
            className="w-full flex flex-col gap-5"
            onSubmit={onSubmit}
        >
            <div>
                <h1 className="font-semibold text-2xl">Cadastrar passageiro</h1>
            </div>

            <PersonalFields />

            <hr className="border-gray-400 mt-3" />

            <AddressFields />

            <hr className="border-gray-400 mt-3" />

            <PassengerFields routeOptions={routeOptions} />

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