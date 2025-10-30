'use client'

import { FieldMethods, FieldRef, FieldValue } from "@/components/form-kit/types"

import { useFormContext } from "../context"
import { useRef, useImperativeHandle, useState, useEffect } from "react"

interface Props {
    ref?: React.Ref<FieldMethods<boolean>>
    name: string
    label?: string
    initChecked?: boolean
    required?: boolean
}

export default function CheckBox({ ref, name, label, initChecked, required }: Props) {

    // Hooks
    const inputRef = useRef<HTMLInputElement>(null)

    const [error, setError] = useState<string | null>(null)
    const { registerField, unregisterField } = useFormContext()

    // Funções internas

    const validate = (): boolean => {
        if (required && !inputRef.current?.checked) {
            setError('Este campo é obrigatório!')
            return false
        }

        setError(null)
        return true
    }

    const getValue = (): boolean => {
        return inputRef.current?.checked || false
    }

    // Controle

    useImperativeHandle(ref, () => {
        return {
            getValue,
            validate
        }
    }, [])

    useEffect(() => {
        const fieldRef: FieldRef<boolean> = {
            current: {
                getValue,
                validate
            }
        }

        registerField(name, fieldRef)

        return () => {
            unregisterField(name)
        }
    }, [name, registerField, unregisterField])

    useEffect(() => {
        initChecked ? inputRef.current!.checked = true : false
    }, [])

    return (
        <div className="flex flex-col">
            <div className="flex gap-2">
                <input
                    id={`input-${name}`}
                    ref={inputRef}
                    type="checkbox"
                    name={name}
                    className={`border rounded-sm transition-all focus:outline-1 px-4 py-1 outline-none
                    ${error ? "border-red-500 outline-red-500 outline-1" : ""}`}
                />
                {label && (
                    <label htmlFor={`input-${name}`} className="ml-2">{label}</label>
                )}
            </div>
            {error && (
                <span className="text-red-500 text-sm mt-1 ml-2">{error}</span>
            )}
        </div>
    )
}