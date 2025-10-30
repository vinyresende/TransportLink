import { connection } from "next/server"

import RouteEditSection from "@/components/(Dashboard)/routes/edit/section"

export default async function RouteEditPage({ params }: PageProps<"/passageiros/edit/[id]">) {
    await connection()

    const { id } = await params

    return (
        <main className="w-full h-full flex flex-col overflow-y-auto p-5">
            <RouteEditSection id={id} />
        </main>
    )
}