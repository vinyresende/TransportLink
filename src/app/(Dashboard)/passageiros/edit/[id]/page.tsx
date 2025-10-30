import { connection } from "next/server"

import PassengerEditSection from "@/components/(Dashboard)/passengers/edit/section"

export default async function PassengerEditPage({ params }: PageProps<"/passageiros/edit/[id]">) {
    await connection()

    const { id } = await params

    return (
        <main className="w-full h-full flex flex-col overflow-y-auto p-5">
            <PassengerEditSection id={id} />
        </main>
    )
}