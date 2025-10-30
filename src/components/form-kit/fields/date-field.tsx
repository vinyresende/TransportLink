'use client'

import { FieldMethods, FieldRef } from "@/components/form-kit/types"

import { useFormContext } from "../context"
import { useRef, useImperativeHandle, useState, useEffect } from "react"

interface Props {
    ref?: React.Ref<FieldMethods<string | null>>
    name: string
    label?: string
    placeholder?: string
    initialValue?: string
    required?: boolean
}

export default function DateField({ ref, name, label, initialValue, placeholder = "", required }: Props) {

    // Hooks
    const inputRef = useRef<HTMLInputElement>(null)

    const [error, setError] = useState<string | null>(null)
    const { registerField, unregisterField } = useFormContext()

    // Funções internas

    const validate = (): boolean => {
        if (required && !inputRef.current?.value) {
            setError('Este campo não pode ficar vazio!')
            return false
        }

        setError(null)
        return true
    }

    const getValue = (): string | null => {
        return inputRef.current?.value ?? null
    }

    const setValue = (val: string | null): void => {
        if (inputRef?.current) {
            inputRef.current.value = String(val)
        }
    }

    // Controle

    useImperativeHandle(ref, () => {
        return {
            getValue,
            setValue,
            validate
        }
    }, [])

    useEffect(() => {
        const fieldRef: FieldRef<string | null> = {
            current: {
                getValue,
                setValue,
                validate
            }
        }

        registerField(name, fieldRef)

        return () => {
            unregisterField(name)
        }
    }, [name, registerField, unregisterField])

    useEffect(() => {
        if (initialValue) {
            setValue(initialValue)
        }
    }, [])

    return (
        <div className="flex flex-col">
            {label && (
                <label htmlFor={`input-${name}`} className="ml-2">{label}</label>
            )}
            <input
                id={`input-${name}`}
                ref={inputRef}
                type="date"
                name={name}
                placeholder={placeholder}
                className={`w-full border rounded-sm transition-all focus:outline-1 appearance-none px-4 py-1
                ${error ? "border-red-500 outline-red-500 outline-1" : ""}`}
            />
            {error && (
                <span className="text-red-500 text-sm mt-1 ml-2">{error}</span>
            )}
        </div>
    )
}