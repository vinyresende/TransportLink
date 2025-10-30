'use client'

import { NotificationProps } from "./types"

import { IoMdClose } from "react-icons/io"
import { FaCheckCircle } from "react-icons/fa"
import { IoMdCloseCircle } from "react-icons/io"

import { motion } from "framer-motion"

export default function Notification({ id, message, type = "Success", dismiss }: NotificationProps) {

    return (
        <motion.div
            initial={{ opacity: 0, x: 200 }}
            exit={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white w-md h-20 flex shadow-lg rounded-xl"
        >
            <div className="w-32 flex items-center justify-center [&_svg]:text-[40px]">
                {type === "Success" ? (
                    <FaCheckCircle className="text-green-400" />
                ) : (
                    <IoMdCloseCircle className="text-red-400" />
                )}
            </div>

            <div className="w-full flex items-center">
                <span className="line-clamp-2">{message}</span>
            </div>

            <button
                onClick={() => { dismiss(id) }}
                className="w-24 h-full flex items-center justify-center cursor-pointer
                rounded-r-xl hover:bg-contrast-2"
            >
                <IoMdClose size={20} />
            </button>
        </motion.div>
    )
}