interface Props {
    text: string
    active?: boolean
    callback: () => void
}

export default function PaginationButton({ text, active = false, callback }: Props) {
    return (
        <button
            className={`w-10 rounded-sm cursor-pointer transition-all py-2 hover:text-gray-300
            hover:bg-contrast-1 ${active ? "bg-contrast-1 text-gray-300" : "bg-contrast-2"}`}
            onClick={callback}
        >
            {text}
        </button>
    )
}