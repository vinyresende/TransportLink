import Link from "next/link"

import { SlOptions } from "react-icons/sl"

interface Props {
    id: number
    name: string
    driver: string
    vehicle_license_plate: string
    annual_recurrence: number
    distance: number
}

export default function RecordRow({ id, name, driver, vehicle_license_plate, annual_recurrence, distance }: Props) {
    return (
        <tr className="h-14">
            <td className="truncate px-1" colSpan={2}>{name}</td>
            <td className="truncate px-1" colSpan={2}>{driver}</td>
            <td className="text-center">{vehicle_license_plate}</td>
            <td className="text-center">{annual_recurrence}</td>
            <td className="text-center">{distance}</td>
            <td className="text-center">
                <div className="flex items-center justify-center">
                    <Link href={`/rotas/edit/${id}`}>
                        <SlOptions />
                    </Link>
                </div>
            </td>
        </tr>
    )
}