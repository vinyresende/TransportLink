'use client'

import { FieldMethods, FieldRef, Option, SelectDropdownRef } from "@/components/form-kit/types"

import { handleSelectKeyDown } from "./utils"
import { useFormContext } from "../../context"
import { useRef, useImperativeHandle, useState, useEffect } from "react"

import { IoCloseSharp } from "react-icons/io5"
import { FaChevronDown } from "react-icons/fa"

import Dropdown from "./dropdown"

interface Props {
    ref?: React.Ref<FieldMethods<Option | null>>
    name: string
    label?: string
    options?: Option[]
    placeholder?: string
    initialValue?: Option
    required?: boolean
}

export default function SelectField({ ref, name, label, options, initialValue, placeholder = "", required }: Props) {

    // Hooks
    const inputRef = useRef<HTMLInputElement>(null)
    const elementRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<SelectDropdownRef>(null)

    const [isOpened, setIsOpened] = useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState<Option | null>(initialValue || null)

    const [text, setText] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const { registerField, unregisterField } = useFormContext()

    // Funções internas

    const validate = (): boolean => {
        if (required && !selectedOption) {
            setError('Este campo não pode ficar vazio!')
            return false
        }

        setError(null)
        return true
    }

    const getValue = (): Option | null => {
        return selectedOption
    }

    const setValue = (val: Option | null): void => {
        setSelectedOption(val)
    }

    // Funcionamento interno do custom select

    const filteredOptions = options?.filter((opt: Option) => {
        let t = text.trim().toLowerCase()
        return opt.label.trim().toLowerCase().includes(t) || opt.sublabel?.trim().toLowerCase().includes(t)
    }).slice(0, 3) || []

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        handleSelectKeyDown(
            e,
            isOpened,
            setIsOpened,
            dropdownRef,
            inputRef,
            filteredOptions.length
        )
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!elementRef.current?.contains(e.target as Node)) {
                setIsOpened(false)
            }
        }

        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [selectedOption])

    // Controle

    useImperativeHandle(ref, () => {
        return {
            getValue,
            setValue,
            validate
        }
    }, [selectedOption])

    useEffect(() => {
        const fieldRef: FieldRef<Option | null> = {
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
    }, [name, registerField, unregisterField, selectedOption])

    useEffect(() => {
        if (inputRef.current?.value) {
            inputRef.current.value = ""
            setText("")
        }
    }, [selectedOption])

    useEffect(() => {
        dropdownRef.current?.setFocusedIndex(0)
    }, [text])

    return (
        <div
            className="flex flex-col"
        >
            {label && (
                <label htmlFor={`input-${name}`} className="ml-2">{label}</label>
            )}

            {/* Custom Select Input */}
            <div
                ref={elementRef}
                className={`relative w-full flex border-gray-400 border-1 rounded-sm focus:outline-1
                focus-within:outline-1 ${error ? "border-red-500 outline-red-500 outline-1" : ""}`}
                onKeyDown={onKeyDown}
                onClick={() => { setIsOpened(!isOpened) }}
                aria-haspopup="listbox"
                role="combobox"
                tabIndex={0}
            >
                <input
                    type="text"
                    ref={inputRef}
                    className={`w-full outline-none border-none px-4 py-1 ${selectedOption ? "placeholder:text-black" : ""}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setText(e.target.value) }}
                    placeholder={selectedOption?.label ?? placeholder}
                    tabIndex={-1}
                />

                {/* Clear select */}
                {selectedOption && (
                    <div
                        className="flex items-center justify-center px-2 my-2
                        cursor-pointer hover:[&_svg]:text-secondary"
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => { setSelectedOption(null) }}
                    >
                        <IoCloseSharp size={13} className="text-gray-400" />
                    </div>
                )}

                <div
                    className="flex items-center justify-center border-gray-400 border-l px-2 my-2 mr-1
                    cursor-pointer"
                >
                    <FaChevronDown size={12} className="text-gray-400" />
                </div>

                {/* Dropdown */}
                {isOpened && (
                    <Dropdown
                        ref={dropdownRef}
                        options={filteredOptions}
                        setIsOpened={setIsOpened}
                        setSelectedOption={setSelectedOption}
                    />
                )}
            </div>

            {error && (
                <span className="text-red-500 text-sm mt-1 ml-2">{error}</span>
            )}
        </div>
    )
}