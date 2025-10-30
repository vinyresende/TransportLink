export interface Route {
    id: number
    name: string
    driver: string
    vehicle_license_plate: string
    annual_recurrence: number
    distance: number
    roadmap: string | null
}
