'use client'

import { motion } from "framer-motion"
import { IoMap } from "react-icons/io5"

import Link from "next/link"
import RecordRow from "./row"
import RecordTable from "./table"
import RoutesFilterForm from "./filter"
import Pagination from "@/components/all/pagination/pagination"

import { useEffect, useState } from "react"

import { Route } from "@/types/routes"
import { getRoutes } from "@/actions/routes"

import { Response } from "@/types/server"
import { useNotificationContext } from "@/components/notifications/context"

const ITEMS_PER_PAGE: number = 10

export default function RouteRecords() {
    const [page, setPage] = useState<number>(1)
    const [totalItems, setTotalItems] = useState<number>(0)
    const [routes, setRoutes] = useState<Route[] | null>(null)
    const [filters, setFilters] = useState<Record<string, string | null>>({})

    const { sendNotification } = useNotificationContext()

    const fetchRoutes = async (): Promise<void> => {
        const res: Response = await getRoutes(filters, page, ITEMS_PER_PAGE)

        if (res.ok) {
            setRoutes(res.data!.routes as Route[])
            setTotalItems(res.data!.total as number)
            return
        }

        sendNotification({ message: "Erro ao buscar rotas!", type: "Error" })
        return setRoutes(null)
    }

    useEffect(() => {
        fetchRoutes()
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
                        <IoMap className="text-contrast-1" size={24} />
                    </div>
                    <h2 className="font-semibold text-2xl">Cadastros de rotas</h2>
                </div>

                <Link
                    href="/rotas/add"
                    className="bg-contrast-1 min-w-[227px] flex justify-center items-center text-[#ebebeb] cursor-pointer rounded-sm py-2"
                >
                    Cadastrar
                </Link>
            </div>

            <div className="mt-5">
                <RoutesFilterForm setFilters={setFilters} setPage={setPage} />
            </div>

            <div className="overflow-x-auto">
                {routes && routes.length > 0 && (
                    <RecordTable>
                        {routes.map((route) => {
                            return (
                                <RecordRow
                                    key={route.id}
                                    id={route.id}
                                    name={route.name}
                                    driver={route.driver}
                                    vehicle_license_plate={route.vehicle_license_plate}
                                    annual_recurrence={route.annual_recurrence}
                                    distance={route.distance}
                                />
                            )
                        })}
                    </RecordTable>
                )}
            </div>


            <div className="flex justify-between max-xl:flex-col items-center mt-5">
                <span>{totalItems} rota(s) encontrada(s)</span>

                <Pagination currentPage={page} setPage={setPage} totalPages={totalItems / ITEMS_PER_PAGE} maxVisiblePages={3} />
            </div>

        </motion.section>
    )
}