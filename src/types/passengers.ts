import { Route } from "./routes"

export interface Passenger {
    id: number
    name: string
    type: string
    mother_name: string | null
    father_name: string | null
    date_of_birth: Date | string
    address_line: string
    neighborhood: string
    city: string
    postal_code: string
    cpf: string
    rg: string | null
    email: string | null
    phone: string
    course: string | null
    destination: string
    special_needs: boolean
    outbound_route_id: string | null
    return_route_id: string | null

    // timestamps
    createdAt: Date
    updatedAt: Date

    // atribuições
    outboundRoute: Route | null
    returnRoute: Route | null
}