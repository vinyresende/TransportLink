import CheckBox from "@/components/form-kit/fields/checkbox"
import TextField from "@/components/form-kit/fields/text-field"
import SelectField from "@/components/form-kit/fields/select/select-field"

import { useEffect, useRef } from "react"
import { Passenger } from "@/types/passengers"
import { FieldMethods, Option } from "@/components/form-kit/types"

const passengerTypeOptions: Option[] = [
    { id: 1, label: "Municipal" },
    { id: 2, label: "Estadual" },
    { id: 3, label: "Caronista" }
]

interface Props {
    routeOptions: Option[]
}

export default function PassengerFields({ routeOptions }: Props) {
    return (
        <>
            <h2 className="font-semibold text-[#8758e7] text-xl">Viagem</h2>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
                <TextField
                    name="passenger_course"
                    label="Curso"
                    placeholder="Ex: Análise e Desenvolvimento de Sistemas"
                />

                <TextField
                    name="passenger_destination"
                    label="Destino *"
                    placeholder="Ex: Faculdade Santa Marcelina"
                    required
                />
            </div>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
                <SelectField
                    name="outbound_route_id"
                    label="Rota de ida"
                    placeholder="Selecione uma opção"
                    options={routeOptions}
                />

                <SelectField
                    name="return_route_id"
                    label="Rota de retorno"
                    placeholder="Selecione uma opção"
                    options={routeOptions}
                />
            </div>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
                <SelectField
                    name="passenger_type"
                    label="Tipo de passageiro *"
                    placeholder="Selecione uma opção"
                    options={passengerTypeOptions}
                    required
                />
            </div>

            <CheckBox
                name="special_needs"
                label="Passageiro portador de necessidades especiais"
            />
        </>
    )
}