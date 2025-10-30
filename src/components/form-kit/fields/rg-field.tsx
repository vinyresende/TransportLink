'use client'

import { FieldMethods, FieldRef } from "@/components/form-kit/types"

import { useFormContext } from "../context"
import { useRef, useImperativeHandle, useState, useEffect } from "react"

interface Props {
    ref?: React.Ref<FieldMethods<string>>
    name: string
    label?: string
    placeholder?: string
    initialValue?: string
    required?: boolean
}

export default function RGField({ ref, name, label, initialValue, placeholder = "", required }: Props) {

    // Hooks
    const inputRef = useRef<HTMLInputElement>(null)

    const [error, setError] = useState<string | null>(null)
    const { registerField, unregisterField } = useFormContext()

    // Funções internas

    const format = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2.$3")
    }

    const validate = (): boolean => {
        if (required && !inputRef.current?.value) {
            setError('Este campo não pode ficar vazio!')
            return false
        } else if (inputRef.current?.value && inputRef.current.value.length < 10) {
            setError('Digite um RG completo!')
            return false
        }

        setError(null)
        return true
    }

    const getValue = (): string => {
        return inputRef.current?.value || ""
    }

    const setValue = (val: string): void => {
        if (inputRef?.current) {
            inputRef.current.value = val.replace(/\D/g, '').replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2.$3")
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
        const fieldRef: FieldRef<string> = {
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
                type="text"
                name={name}
                maxLength={10}
                placeholder={placeholder}
                className={`border rounded-sm transition-all focus:outline-1 px-4 py-1
                ${error ? "border-red-500 outline-red-500 outline-1" : ""}`}
                onChange={format}
            />
            {error && (
                <span className="text-red-500 text-sm mt-1 ml-2">{error}</span>
            )}
        </div>
    )
}