import RGField from "@/components/form-kit/fields/rg-field"
import CPFField from "@/components/form-kit/fields/cpf-field"
import DateField from "@/components/form-kit/fields/date-field"
import TextField from "@/components/form-kit/fields/text-field"
import EmailField from "@/components/form-kit/fields/email-field"
import PhoneField from "@/components/form-kit/fields/phone-field"

import { Passenger } from "@/types/passengers"

interface Props {
    info: Passenger
}

export default function PersonalFields({ info }: Props) {
    return (
        <>
            <h2 className="font-semibold text-[#8758e7] text-xl">Informações pessoais</h2>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
                <TextField
                    name="passenger_name"
                    label="Nome do passageiro *"
                    placeholder="Ex: John Doe"
                    initialValue={info.name}
                    required
                />

                <DateField
                    name="date_of_birth"
                    label="Data de nascimento *"
                    initialValue={String(info.date_of_birth)}
                    required
                />
            </div>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
                <TextField
                    name="passenger_mother"
                    label="Nome da mãe"
                    placeholder="Ex: Jane Doe"
                    initialValue={info.mother_name || ''}
                />

                <TextField
                    name="passenger_father"
                    label="Nome do pai"
                    placeholder="Ex: John Smith"
                    initialValue={info.father_name || ''}
                />
            </div>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
                <EmailField
                    name="passenger_email"
                    label="Email"
                    placeholder="Ex: email@example.com"
                    initialValue={info.email || ""}
                />

                <PhoneField
                    name="passenger_phone"
                    label="Telefone *"
                    placeholder="Ex: (32) 91234-5678"
                    initialValue={info.phone}
                    required
                />
            </div>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
                <CPFField
                    name="passenger_cpf"
                    label="CPF *"
                    placeholder="Ex: 000.000.000-00"
                    initialValue={info.cpf}
                    required
                />

                <RGField
                    name="passenger_rg"
                    label="Identidade"
                    placeholder="Ex: 00.000.000"
                    initialValue={info.rg || ""}
                />
            </div>
        </>
    )
}