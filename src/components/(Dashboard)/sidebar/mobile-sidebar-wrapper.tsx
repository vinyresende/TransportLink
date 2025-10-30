'use client'

import { useQueryState } from "nuqs"
import { AnimatePresence } from "framer-motion"

interface Props {
    children: React.ReactElement | React.ReactElement[]
}

export default function MobileSidebarWrapper({ children }: Props) {
    const [visible, setVisible] = useQueryState<boolean>("show-menu", {
        defaultValue: false,
        parse: (value): boolean | null => {
            return Boolean(value) || null
        }
    })

    return (
        <AnimatePresence>
            {visible ? children : (<></>)}
        </AnimatePresence>
    )
}