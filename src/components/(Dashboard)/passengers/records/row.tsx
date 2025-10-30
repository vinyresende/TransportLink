import Link from "next/link"

import { SlOptions } from "react-icons/sl"

interface Props {
    id: number | string
    name: string
    destination: string
    type: string
    outboundRoute: string
    returnRoute: string
}

export default function RecordRow({ id, name, destination, type, outboundRoute, returnRoute }: Props) {
    return (
        <tr className="h-14">
            <td className="truncate px-1" colSpan={2}>{name}</td>
            <td className="truncate px-1" colSpan={2}>{destination}</td>
            <td className="text-center">{type}</td>
            <td className="text-center">{outboundRoute}</td>
            <td className="text-center">{returnRoute}</td>
            <td className="text-center">
                <div className="flex items-center justify-center">
                    <Link href={`/passageiros/edit/${id}`}>
                        <SlOptions />
                    </Link>
                </div>
            </td>
        </tr>
    )
}