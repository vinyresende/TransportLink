'use client'

import { FieldMethods, FieldRef } from "@/components/form-kit/types"

import { useFormContext } from "../context"
import { useRef, useImperativeHandle, useState, useEffect } from "react"

import { GoEye } from "react-icons/go"
import { GoEyeClosed } from "react-icons/go"

interface Props {
    ref?: React.Ref<FieldMethods<string>>
    name: string
    label?: string
    placeholder?: string
    required?: boolean
    initialValue?: string
}

export default function PasswordField({ ref, name, label, initialValue, placeholder = "", required }: Props) {

    // Hooks
    const inputRef = useRef<HTMLInputElement>(null)

    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const { registerField, unregisterField } = useFormContext()

    // Funções internas

    const handleVisibility = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsVisible(!isVisible)
    }

    const validate = (): boolean => {
        if (required && !inputRef.current?.value) {
            setError('Este campo não pode ficar vazio!')
            return false
        }

        setError(null)
        return true
    }

    const getValue = (): string => {
        return inputRef.current?.value ?? ""
    }

    const setValue = (val: string): void => {
        if (inputRef?.current) {
            inputRef.current.value = val
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
            <div
                className={`flex items-center justify-center
                border border-gray-400 rounded-sm transition-all focus-within:outline-1
                ${error ? "border-red-500 outline-red-500 outline-1" : ""}`}
            >
                <input
                    id={`input-${name}`}
                    ref={inputRef}
                    type={isVisible ? "text" : "password"}
                    name={name}
                    placeholder={placeholder}
                    className={`w-full outline-none px-4 py-1`}
                />
                <button type="button" className="cursor-pointer px-2" onClick={handleVisibility}>
                    {isVisible ? (
                        <GoEyeClosed />
                    ) : (
                        <GoEye />
                    )}
                </button>
            </div>
            {error && (
                <span className="text-red-500 text-sm mt-1 ml-2">{error}</span>
            )}
        </div>
    )
}