'use client'

import { motion } from "framer-motion"
import { Route } from "@/types/routes"
import { Response } from "@/types/server"
import { useEffect, useState } from "react"
import { fetchRouteById } from "@/actions/routes"

import RouteEditForm from "./form"
import FormPlaceholder from "@/components/all/form-placeholder/form-placeholder"

interface Props {
    id?: string
}

export default function RouteEditSection({ id }: Props) {
    const [info, setInfo] = useState<Route | null>(null)
    const [searching, setSearching] = useState<boolean>(true)

    const valid: boolean = !Number.isNaN(Number(id))

    const fetchRouteInfo = async (id: number): Promise<void> => {
        const res: Response = await fetchRouteById(Number(id))

        if (res.ok) {
            setInfo(res.data!.route as Route)
        }

        setSearching(false)
    }

    useEffect(() => {
        if (valid) {
            fetchRouteInfo(Number(id))
        } else {
            setSearching(false)
        }
    }, [])

    return (
        <motion.section
            className="bg-white w-full max-w-7xl flex flex-col shadow-lg rounded-xl mx-auto p-10 mt-5"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5, ease: "easeOut" }}
        >
            <div className="flex justify-between max-lg:flex-col gap-3">

                {valid && searching && (
                    <FormPlaceholder />
                )}

                {(!valid || (!searching && !info)) && (
                    <div className="w-full text-center">
                        <span className="font-semibold text-xl">Rota não encontrada!</span>
                    </div>
                )}

                {valid && info && (
                    <RouteEditForm info={info} />
                )}

            </div>
        </motion.section>
    )
}