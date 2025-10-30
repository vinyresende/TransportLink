export default function FormPlaceholder() {
    return (
        <div className="w-full flex flex-col gap-3">
            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-3">
                <div className="bg-gray-200 h-[34px] rounded-sm animate-pulse"></div>
                <div className="bg-gray-200 h-[34px] rounded-sm animate-pulse"></div>
            </div>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-3">
                <div className="bg-gray-200 h-[34px] rounded-sm animate-pulse"></div>
                <div className="bg-gray-200 h-[34px] rounded-sm animate-pulse"></div>
            </div>

            <div className="bg-gray-200 w-full h-32 rounded-sm animate-pulse"></div>

            <div className="flex justify-end">
                <div className="bg-gray-200 w-32 h-12 rounded-sm animate-pulse"></div>
            </div>
        </div>
    )
}