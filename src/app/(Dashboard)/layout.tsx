import type { Metadata } from "next"
import "../globals.css"

import Header from "@/components/(Dashboard)/header/header"
import Sidebar from "@/components/(Dashboard)/sidebar/sidebar"

import NextAuthProvider from "@/components/(Auth)/session-provider"
import NotificationProvider from "@/components/notifications/context"
import MobileSidebar from "@/components/(Dashboard)/sidebar/mobile-sidebar"
import MobileSidebarWrapper from "@/components/(Dashboard)/sidebar/mobile-sidebar-wrapper"

import { NuqsAdapter } from "nuqs/adapters/next"
import { connection } from "next/server"

export const metadata: Metadata = {
	title: "TransportLink",
	description: "Gerenciamento de transporte escolar",
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	await connection()

	return (
		<html lang="pt-BR">
			<body className="bg-[#ebebeb] h-screen min-h-screen flex overflow-x-hidden">
				<NuqsAdapter>
					<NextAuthProvider>
						<NotificationProvider>
							<Sidebar />
							<MobileSidebarWrapper>
								<MobileSidebar />
							</MobileSidebarWrapper>
							<div className="w-full h-full flex flex-col overflow-x-hidden">
								<Header />
								{children}
							</div>
						</NotificationProvider>
					</NextAuthProvider>
				</NuqsAdapter>
			</body>
		</html >
	)
}
