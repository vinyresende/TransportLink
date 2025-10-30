'use client'

import { useQueryState } from "nuqs"
import { motion } from "framer-motion"
import { LuLink } from "react-icons/lu"
import { useCallback, useEffect, useRef } from "react"

import SidebarMenu from "./menu"
import LogoutButton from "./logout-button"

export default function MobileSidebar() {
    const [visible, setVisible] = useQueryState<boolean>("show-menu", {
        defaultValue: false,
        parse: (value): boolean | null => {
            return Boolean(value) || null
        }
    })

    const sidebarRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (e: MouseEvent) => {
        const element: Element | null = document.querySelector(".sidebar")

        if (!element?.contains((e.target as Element))) {
            setVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <>
            <motion.aside
                ref={sidebarRef}
                className="bg-contrast-1 w-80 min-w-80 h-full flex flex-col shadow-lg border-r text-gray-400 z-50
                min-lg:hidden max-lg:fixed max-lg:top-0 max-lg:left-0 sidebar opened"
                initial={{ opacity: 0, x: -100 }}
                exit={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: .2, ease: "easeOut" }}
            >
                <div className="bg-[#17181a] w-80 min-w-80 h-20 min-h-20 flex items-center text-2xl gap-2 px-15">
                    <LuLink size={20} /> <span className="font-semibold">TransportLink</span>
                </div>

                <SidebarMenu />

                <div className="flex flex-col justify-end">
                    <LogoutButton />
                </div>
            </motion.aside>
        </>
    )
}