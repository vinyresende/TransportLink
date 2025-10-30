'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Passenger } from "@/types/passengers"
import { fetchPassengerById } from "@/actions/passengers"

import PassengerEditForm from "./form"
import FormPlaceholder from "@/components/all/form-placeholder/form-placeholder"

interface Props {
    id?: string
}

export default function PassengerEditSection({ id }: Props) {
    const [info, setInfo] = useState<Passenger | null>(null)
    const [searching, setSearching] = useState<boolean>(true)
    const valid: boolean = !Number.isNaN(Number(id))

    const fetchPassengerInfo = async (id: number): Promise<void> => {
        const res = await fetchPassengerById(Number(id))

        if (res.ok) {
            setInfo(res.data!.passenger as Passenger)
        }

        setSearching(false)
    }

    useEffect(() => {
        if (valid) {
            fetchPassengerInfo(Number(id))
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
                        <span className="font-semibold text-xl">Passageiro não encontrado!</span>
                    </div>
                )}

                {valid && info && (
                    <PassengerEditForm info={info} />
                )}

            </div>
        </motion.section>
    )
}