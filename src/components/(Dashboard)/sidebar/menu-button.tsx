'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
    children: React.ReactNode | React.ReactNode[]
    href?: string
}

export default function MenuButton({ href = "#", children }: Props) {
    const pathname: string = usePathname()
    const active: boolean = href.split("/")[1] === pathname.split("/")[1]

    return (
        <Link href={href}>
            <button
                className={`w-full flex items-center text-lg text-start cursor-pointer gap-3 px-15 py-3 
                hover:bg-white/10 transition-all ${active ? "bg-white/10" : {}}`}
            >
                {children}
            </button>
        </Link>
    )
}
