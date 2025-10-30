import MenuButton from "./menu-button"

import { RiDashboardHorizontalFill } from "react-icons/ri"
import { FaUsers } from "react-icons/fa"
import { IoMap } from "react-icons/io5"

export default function SidebarMenu() {
    return (
        <nav className="h-full flex flex-col py-5">
            <MenuButton href="/">
                <RiDashboardHorizontalFill size={22} /> <span>Dashboard</span>
            </MenuButton>
            <MenuButton href="/passageiros">
                <FaUsers size={22} /> <span>Passageiros</span>
            </MenuButton>
            <MenuButton href="/rotas">
                <IoMap size={22} /> <span>Rotas</span>
            </MenuButton>
        </nav>
    )
}