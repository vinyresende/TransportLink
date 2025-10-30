import { RefObject } from "react"

export interface FieldMethods<T extends FieldValue = FieldValue> {
    getValue: () => T
    setValue?: (val: T) => void
    validate: () => boolean
}

export type FieldValue = string | number | File | Option | Date | boolean | null | undefined

export type FieldRef<T extends FieldValue = FieldValue> = RefObject<FieldMethods<T>>

export type FieldRegistry = Record<string, FieldRef<any>>

export interface FormContextType {
    registerField: <T extends FieldValue = FieldValue>(name: string, ref: FieldRef<T>) => void
    unregisterField: (name: string) => void
}

// Custom Select

export interface SelectDropdownRef {
    selectOption: () => void
    setFocusedIndex: React.Dispatch<React.SetStateAction<number>>
}

export interface Option {
    id: string | number
    label: string
    sublabel?: string
}
