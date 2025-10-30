import { LuLink } from "react-icons/lu"

import LogoutButton from "./logout-button"
import SidebarMenu from "./menu"

export default function Sidebar() {
    return (
        <aside className="bg-contrast-1 w-80 min-w-80 h-full flex flex-col shadow-lg border-r text-gray-400 max-lg:hidden z-50">
            <div className="bg-[#17181a] w-80 min-w-80 h-20 min-h-20 flex items-center text-2xl gap-2 px-15">
                <LuLink size={20} /> <span className="font-semibold">TransportLink</span>
            </div>

            <SidebarMenu />

            <div className="flex flex-col justify-end">
                <LogoutButton />
            </div>
        </aside>
    )
}