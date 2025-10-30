import CEPField from "@/components/form-kit/fields/cep-field"
import TextField from "@/components/form-kit/fields/text-field"

import { Passenger } from "@/types/passengers"

interface Props {
    info: Passenger
}

export default function AddressFields({ info }: Props) {
    return (
        <>
            <h2 className="font-semibold text-[#8758e7] text-xl">Endereço</h2>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
                <TextField
                    name="passenger_address_line"
                    label="Linha de endereço *"
                    placeholder="Ex: Rua das graças"
                    initialValue={info.address_line}
                    required
                />

                <CEPField
                    name="passenger_postal_code"
                    label="CEP *"
                    placeholder="Ex: 36790-000"
                    initialValue={info.postal_code}
                    required
                />
            </div>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
                <TextField
                    name="passenger_neighborhood"
                    label="Bairro *"
                    placeholder="Ex: Bairro das cerejeiras"
                    initialValue={info.neighborhood}
                    required
                />

                <TextField
                    name="passenger_city"
                    label="Cidade *"
                    placeholder="Ex: Rio de Janeiro"
                    initialValue={info.city}
                    required
                />
            </div>
        </>
    )
}