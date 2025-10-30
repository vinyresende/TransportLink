import { connection } from "next/server"

import RouteRegisterSection from "@/components/(Dashboard)/routes/register/section"

export default async function AddRoute() {
    await connection()

    return (
        <main className="w-full h-full flex flex-col overflow-y-auto p-5">
            <RouteRegisterSection />
        </main>
    )
}