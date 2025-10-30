'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { IoIosExit } from "react-icons/io"

export default function LogoutButton() {
    const router = useRouter()

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault()

        await signOut({ redirect: false })
        return router.push("/auth/login")
    }

    return (
        <button
            className="w-full flex items-center border-t gap-2 px-15 py-5
            hover:bg-white/10 border-black/20 text-lg text-start cursor-pointer transition-all"
            onClick={handleLogout}
        >
            <IoIosExit size={22} /> <span>Logout</span>
        </button>
    )
}