'use client'

import Link from "next/link"
import AddressFields from "./address-fields"
import PersonalFields from "./personal-fields"
import PassengerFields from "./passenger-fields"
import Form from "@/components/form-kit/context"

import { Response } from "@/types/server"
import { FieldValue, Option } from "@/components/form-kit/types"

import { saveAs } from "file-saver"
import { GoTrash } from "react-icons/go"
import { useRouter } from "next/navigation"
import { Passenger } from "@/types/passengers"
import { BsFiletypeDocx } from "react-icons/bs"
import { getRouteOptions } from "@/actions/routes"
import { useEffect, useRef, useState } from "react"
import { deletePassenger, genFormDocument, updatePassenger } from "@/actions/passengers"
import { useNotificationContext } from "@/components/notifications/context"

interface Props {
    info: Passenger
}

export default function PassengerEditForm({ info }: Props) {
    const router = useRouter()

    const [isPending, setIsPending] = useState<boolean>(false)
    const [routeOptions, setRouteOptions] = useState<Option[]>([])

    const { sendNotification } = useNotificationContext()

    const onSubmit = async (formData: Record<string, FieldValue>) => {
        if (isPending) return

        setIsPending(true)

        // Informações formatadas
        const cep = (formData.passenger_postal_code! as string).replace(/\D/g, "")
        const cpf = (formData.passenger_cpf! as string).replace(/\D/g, "")
        const rg = (formData.passenger_rg as string).replace(/\D/g, "")
        const phone = (formData.passenger_phone as string).replace(/\D/g, "")

        // Payload com os dados para o banco de dados
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

        const res = await updatePassenger(info.id, payload)

        // Resposta positiva da requisição
        if (res.ok) {
            sendNotification({ message: "Cadastro atualizado com sucesso!", type: "Success" })
            router.push("/passageiros")
            return
        }

        // Em caso de Erro
        sendNotification({ message: "Erro ao atualizar cadastro!", type: "Error" })
        setIsPending(false)
        return
    }

    // Buscar opções de rotas para SelectFields
    const fetchRouteOptions = async (): Promise<void> => {
        const res: Response<{ routeOptions: Option[] }> = await getRouteOptions()

        if (res.ok) {
            return setRouteOptions(res.data!.routeOptions)
        }

        return sendNotification({ message: "Erro ao buscar rotas!", type: "Error" })
    }

    // Delete
    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault()

        const res: Response = await deletePassenger(info.id)

        if (res.ok) {
            sendNotification({ message: "Registro deletado com sucesso!", type: "Success" })
            router.push("/passageiros")
            return
        }

        return sendNotification({ message: "Erro ao deletar registro!", type: "Error" })
    }

    // Download
    const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault()

        const res = await genFormDocument(info)

        if (res.ok) {
            saveAs(res.data!.doc, `FICHA DE INSCRIÇÃO 2025 - ${info.name}`)
            sendNotification({ message: "Ficha criada com sucesso!", type: "Success" })
            return
        }

        sendNotification({ message: "Erro ao criar ficha!", type: "Error" })
        return
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
                <h1 className="font-semibold text-2xl">Editar cadastro de passageiro</h1>
            </div>

            <PersonalFields info={info} />

            <hr className="border-gray-400 mt-3" />

            <AddressFields info={info} />

            <hr className="border-gray-400 mt-3" />

            <PassengerFields info={info} routeOptions={routeOptions} />

            <div className="flex max-lg:flex-col justify-between items-center gap-3">
                <div className="grid grid-cols-2 gap-3 max-lg:w-full">
                    {/* Delte */}
                    <button
                        type="button"
                        className="bg-contrast-2 hover:bg-red-500 text-black hover:text-gray-300
                        cursor-pointer rounded-sm transition-all px-10 py-3"
                        tabIndex={-1}
                        onClick={handleDelete}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <GoTrash size={20} />
                            Deletar
                        </div>
                    </button>

                    <button
                        className="bg-contrast-2 hover:bg-blue-500 text-black hover:text-gray-300
                        cursor-pointer rounded-sm transition-all px-10 py-3"
                        onClick={handleDownload}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <BsFiletypeDocx size={20} />
                            Baixar docx
                        </div>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3 max-lg:w-full">
                    {/* Cancel */}
                    <Link href="/passageiros"
                        className="bg-contrast-2 hover:bg-contrast-1 text-black hover:text-gray-300
                        flex items-center justify-center cursor-pointer rounded-sm transition-all px-10 py-3"
                    >
                        Cancelar
                    </Link>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-contrast-2 hover:bg-contrast-1 text-black hover:text-gray-300
                        cursor-pointer rounded-sm transition-all px-10 py-3"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </Form>
    )
}
