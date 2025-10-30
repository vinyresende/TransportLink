import { createContext, useContext, useRef } from "react"
import { FieldRef, FieldRegistry, FieldValue, FormContextType } from "@/components/form-kit/types"

export const FormContext = createContext<FormContextType | undefined>(undefined)

interface Props {
    children: React.ReactNode | React.ReactNode[]
    id?: string
    className?: string
    onSubmit: (formData: Record<string, FieldValue>) => void
}

export const useFormContext = () => {
    const context = useContext(FormContext)

    if (!context) {
        throw new Error('useFormContext deve ser uilizado dentro de um FormProvider')
    }

    return context
}

export default function Form({ children, id, className, onSubmit }: Props) {
    const fieldsRef = useRef<FieldRegistry>({})

    const registerField = <T extends FieldValue>(name: string, ref: FieldRef<T>) => {
        fieldsRef.current[name] = ref
    }

    const unregisterField = (name: string) => {
        delete fieldsRef.current[name]
    }

    const validateForm = (): boolean => {
        let isValid = true
        const fields = fieldsRef.current

        Object.entries(fields).forEach(([_, ref]) => {
            const field = ref.current

            if (!field.validate()) {
                isValid = false
            }
        })

        return isValid
    }

    const getFormData = (): Record<string, FieldValue> => {
        const formData: Record<string, FieldValue> = {}
        const fields = fieldsRef.current

        Object.entries(fields).forEach(([name, ref]) => {
            formData[name] = ref.current?.getValue()
        })

        return formData
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            onSubmit(getFormData())
        }
    }

    return (
        <FormContext.Provider value={{ registerField, unregisterField }}>
            <form
                {...id ? { id } : {}}
                {...className ? { className } : {}}
                onSubmit={handleSubmit}
            >
                {children}
            </form>
        </FormContext.Provider>
    )
}
