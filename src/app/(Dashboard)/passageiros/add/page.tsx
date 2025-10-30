import { connection } from "next/server"

import PassengerRegisterSection from "@/components/(Dashboard)/passengers/register/section"

export default async function AddPassenger() {
    await connection()

    return (
        <main className="w-full h-full flex flex-col overflow-y-auto p-5">
            <PassengerRegisterSection />
        </main>
    )
}