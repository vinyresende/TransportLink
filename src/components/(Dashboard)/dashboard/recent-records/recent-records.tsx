'use client'

import { BsClockFill } from "react-icons/bs"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Passenger } from "@/types/passengers"
import { getRecentPassengers } from "@/actions/passengers"
import { useNotificationContext } from "@/components/notifications/context"


import RecordRow from "./row"
import RecordTable from "./table"

export default function RecentRecords() {
    const [passengers, setPassengers] = useState<Passenger[] | null>(null)

    const { sendNotification } = useNotificationContext()

    const fetchRecentPassengers = async (): Promise<void> => {
        const res = await getRecentPassengers()

        if (res.ok) { return setPassengers(res.data!.passengers as Passenger[]) }

        sendNotification({ message: "Erro ao buscar passageiros!", type: "Error" })
        return setPassengers(null)
    }

    useEffect(() => {
        fetchRecentPassengers()
    }, [])

    return (
        <motion.section
            className="bg-white w-full max-w-7xl flex flex-col shadow-lg rounded-xl mx-auto max-lg:mt-10 p-10 mt-5"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5, delay: .5, ease: "easeOut" }}
        >
            <div className="flex items-center gap-3">
                <div className="bg-contrast-2 text-[#ebebeb] rounded-xl p-3">
                    <BsClockFill className="text-contrast-1" size={24} />
                </div>
                <h2 className="font-semibold text-2xl">Cadastros recentes</h2>
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

        </motion.section>
    )
}