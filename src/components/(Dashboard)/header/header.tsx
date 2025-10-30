'use client'

import { TiCog } from "react-icons/ti"
import { CgMenuLeftAlt } from "react-icons/cg"

import { useQueryState } from "nuqs"
import { useSession } from "next-auth/react"

import Link from "next/link"
import { useCallback } from "react"

export default function Header() {
    const [visible, setVisible] = useQueryState<boolean>("show-menu", {
        defaultValue: false,
        parse: (value): boolean | null => {
            return Boolean(value) || null
        }
    })

    const { data: session } = useSession()

    const handleOpen = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        let element = document.querySelector('.sidebar')
        
        if (!element) {
            setVisible(true)
        }
    }, [visible])

    return (
        <header className="bg-white w-full h-20 min-h-20 flex justify-between shadow-lg overflow-y-visible text-gray-400 z-40">
            <div className="flex items-center px-10 gap-3">
                <button
                    className="min-lg:hidden"
                    onClick={handleOpen}
                    aria-label="Expandir Menu"
                >
                    <CgMenuLeftAlt size={35} />
                </button>

                <Link href="#">
                    <TiCog size={40} />
                </Link>
            </div>

            <div className="w-full flex justify-end items-center gap-5 px-10">
                {session?.user ? (
                    <span>{session?.user.username || ""}</span>
                ) : (
                    <div className="bg-gray-200 w-20 h-4 animate-pulse rounded-sm"></div>
                )}
                <img
                    className="w-10 h-10 rounded-full"
                    src="/avatar.png"
                    alt="user-avatar"
                />
            </div>
        </header>
    )
}