'use client'

import { motion } from "framer-motion"

import PassengerRegisterForm from "./form"

export default function PassengerRegisterSection() {
    return (
        <motion.section
            className="bg-white w-full max-w-7xl flex flex-col shadow-lg rounded-xl mx-auto p-10 mt-5"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5, ease: "easeOut" }}
        >
            <div className="flex justify-between max-lg:flex-col gap-3">

                <PassengerRegisterForm />

            </div>
        </motion.section>
    )
}