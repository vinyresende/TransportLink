import { connection } from "next/server"

import PassengerRecords from "@/components/(Dashboard)/passengers/records/section"

export default async function PassengersPage() {
    await connection()

    return (
        <main className="w-full h-full flex flex-col overflow-y-auto p-5">
            <PassengerRecords />
        </main>
    )
}