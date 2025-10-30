import "../globals.css"

import type { Metadata } from "next"

import NextAuthProvider from "@/components/(Auth)/session-provider"
import NotificationProvider from "@/components/notifications/context"

export const metadata: Metadata = {
	title: 'TransportLink',
	description: 'Gerenciamento de transporte escolar',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="pt-BR">
			<body className="bg-[#ebebeb] w-full min-h-screen overflow-x-hidden">
				<NextAuthProvider>
					<NotificationProvider>
						{children}
					</NotificationProvider>
				</NextAuthProvider>
			</body>
		</html>
	)
}
