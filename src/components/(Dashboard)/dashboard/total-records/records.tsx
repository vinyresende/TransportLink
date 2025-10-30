'use client'

import { motion } from "framer-motion"
import { FaMap } from "react-icons/fa"
import { MdLocalTaxi } from "react-icons/md"
import { PiStudentFill } from "react-icons/pi"

import { getCounts } from "@/actions/all"
import { useEffect, useState } from "react"
import { useNotificationContext } from "@/components/notifications/context"

import Card from "@/components/all/card/card"

export default function Records() {
    const [routes, setRoutes] = useState<number>(0)
    const [hitchhikers, setHitchhikers] = useState<number>(0)
    const [statePassengers, setStatePassengers] = useState<number>(0)
    const [municipalPassengers, setMunicipalPassengers] = useState<number>(0)

    const { sendNotification } = useNotificationContext()

    const fetchCounts = async (): Promise<void> => {
        const res = await getCounts()

        if (res.ok) {
            setMunicipalPassengers(res.data!.municipalPassengers as number)
            setStatePassengers(res.data!.statePassengers as number)
            setHitchhikers(res.data!.hitchhikers as number)
            setRoutes(res.data!.routes as number)
            return
        }

        sendNotification({ message: "Erro ao buscar cadastros!", type: "Error" })
    }

    useEffect(() => {
        fetchCounts()
    }, [])

    return (
        <motion.section
            className="w-full max-w-7xl rounded-sm mx-auto"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .5, ease: "easeOut" }}
        >

            <div
                className="w-full grid min-2xl:grid-cols-4 max-md:grid-cols-1
                grid-cols-2 font-semibold text-xl gap-x-8 gap-y-10"
            >

                <Card contrast>
                    <div className="bg-contrast-2 text-[#ebebeb] rounded-xl p-3">
                        <FaMap size={40} />
                    </div>
                    <span className="text-center">{routes} Rotas Cadastradas</span>
                </Card>

                <Card contrast>
                    <div className="bg-contrast-2 text-[#ebebeb] rounded-xl p-3">
                        <PiStudentFill size={40} />
                    </div>
                    <span className="text-center">{statePassengers} Alunos Estaduais</span>
                </Card>

                <Card>
                    <div className="bg-contrast-2 text-[#ebebeb] rounded-xl p-3">
                        <PiStudentFill className="text-contrast-1" size={40} />
                    </div>
                    <span className="text-center">{municipalPassengers} Alunos Municipais</span>
                </Card>

                <Card>
                    <div className="bg-contrast-2 text-[#ebebeb] rounded-xl p-3">
                        <MdLocalTaxi className="text-contrast-1" size={40} />
                    </div>
                    <span className="text-center">{hitchhikers} Caronistas</span>
                </Card>

            </div>

        </motion.section>
    )
}