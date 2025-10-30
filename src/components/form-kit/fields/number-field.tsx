'use client'

import { FieldMethods, FieldRef } from "@/components/form-kit/types"

import { useFormContext } from "../context"
import { useRef, useImperativeHandle, useState, useEffect } from "react"

interface Props {
    ref?: React.Ref<FieldMethods<number | null>>
    name: string
    label?: string
    placeholder?: string
    initialValue?: number
    required?: boolean
}

export default function NumberField({ ref, name, label, initialValue, placeholder = "", required }: Props) {

    // Hooks
    const inputRef = useRef<HTMLInputElement>(null)

    const [error, setError] = useState<string | null>(null)
    const { registerField, unregisterField } = useFormContext()

    // Funções internas

    const format = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/\D/, '')
    }

    const validate = (): boolean => {
        if (required && !inputRef.current?.value) {
            setError('Este campo não pode ficar vazio!')
            return false
        }

        setError(null)
        return true
    }

    const getValue = (): number | null => {
        return Number(inputRef.current?.value.replace(/\D/, '')) || null
    }

    const setValue = (val: number | null): void => {
        if (inputRef?.current && val) {
            inputRef.current.value = String(val).replace(/\D/, '')
        }
    }

    // Controle

    useImperativeHandle(ref, () => {
        return {
            getValue,
            validate
        }
    }, [])

    useEffect(() => {
        if (initialValue) {
            setValue(initialValue)
        }
    }, [])

    useEffect(() => {
        const fieldRef: FieldRef<number | null> = {
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