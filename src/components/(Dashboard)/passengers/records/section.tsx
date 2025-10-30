'use client'

import { motion } from "framer-motion"
import { FaUsers } from "react-icons/fa"

import { Response } from "@/types/server"
import { useEffect, useState } from "react"
import { Passenger } from "@/types/passengers"
import { getPassengers } from "@/actions/passengers"
import { useNotificationContext } from "@/components/notifications/context"

import Link from "next/link"
import RecordRow from "./row"
import RecordTable from "./table"
import PassengersFilterForm from "./filter"
import Pagination from "@/components/all/pagination/pagination"

const ITEMS_PER_PAGE: number = 10

export default function PassengerRecords() {
    const [page, setPage] = useState<number>(1)
    const [totalItems, setTotalItems] = useState<number>(0)
    const [passengers, setPassengers] = useState<Passenger[] | null>(null)
    const [filters, setFilters] = useState<Record<string, string | number | Date | null>>({})

    const { sendNotification } = useNotificationContext()

    const fetchPassengers = async (): Promise<void> => {
        const res: Response = await getPassengers(filters, page, ITEMS_PER_PAGE)

        if (res.ok) {
            setPassengers(res.data!.passengers as Passenger[])
            setTotalItems(res.data!.total as number)
            return
        }

        sendNotification({ message: "Erro ao buscar passageiros!", type: "Error" })
        return setPassengers(null)
    }

    useEffect(() => {
        fetchPassengers()
    }, [filters, page])

    return (
        <motion.section
            className="bg-white w-full max-w-7xl flex flex-col shadow-lg rounded-xl mx-auto p-10 mt-5"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5, ease: "easeOut" }}
        >
            <div className="flex justify-between max-lg:flex-col gap-3">
                <div className="flex items-center gap-3">
                    <div className="bg-contrast-2 text-[#ebebeb] rounded-xl p-3">
                        <FaUsers className="text-contrast-1" size={24} />
                    </div>
                    <h2 className="font-semibold text-2xl">Cadastros de passageiros</h2>
                </div>

                <Link
                    href="/passageiros/add"
                    className="bg-contrast-1 min-w-[227px] flex justify-center items-center text-[#ebebeb] cursor-pointer rounded-sm py-2"
                >
                    Cadastrar
                </Link>
            </div>

            <div className="mt-5">
                <PassengersFilterForm setFilters={setFilters} />
            </div>

            <div className="overflow-x-auto">
                {passengers && passengers.length > 0 && (
                    <RecordTable>
                        {passengers.map((passenger) => {
                            return (
                                <RecordRow
                                    key={passenger.id}
                                    id={passenger.id}
                                    name={passenger.name}
                                    destination={passenger.destination}
                                    type={passenger.type}
                                    outboundRoute={passenger.outboundRoute?.name || ""}
                                    returnRoute={passenger.returnRoute?.name || ""}
                                />
                            )
                        })}
                    </RecordTable>
                )}
            </div>

            <div className="flex justify-between max-xl:flex-col items-center mt-5">
                <span>{totalItems} passageiro(s) encontrado(s)</span>

                <Pagination currentPage={page} setPage={setPage} totalPages={totalItems / ITEMS_PER_PAGE} maxVisiblePages={3} />
            </div>

        </motion.section>
    )
}