interface Props {
    children: React.ReactNode | React.ReactNode[]
    contrast?: boolean
    colSpan?: number
}

export default function Card({ children, contrast = false, colSpan = 1 }: Props) {
    return (
        <div
            className={`${contrast ? "bg-contrast-1 text-[#ebebeb]" : "bg-white text-black"} flex items-center
            col-span-${colSpan} rounded-xl shadow-lg gap-3 p-10`}
        >
            {children}
        </div>
    )
}