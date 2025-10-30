import { connection } from "next/server"

import Records from "@/components/(Dashboard)/dashboard/total-records/records"
import RecentRecords from "@/components/(Dashboard)/dashboard/recent-records/recent-records"

export default async function Home() {
	await connection()

	return (
		<main className="w-full h-full flex flex-col overflow-y-auto p-5">

			<Records />
			<RecentRecords />

		</main>
	)
}
