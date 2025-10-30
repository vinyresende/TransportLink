interface Props {
    children: React.ReactNode | React.ReactNode[]
}

export default function RecordTable({ children }: Props) {
    return (
        <table className="w-full min-lg:table-fixed mt-5">
            <thead>
                <tr className="h-10 border-b border-gray-400">
                    <th className="max-lg:px-8 text-start px-1" colSpan={2}>Nome</th>
                    <th className="max-lg:px-8 text-start px-1" colSpan={2}>Destino</th>
                    <th className="max-lg:px-8">Tipo</th>
                    <th className="max-lg:px-8">Rota ida</th>
                    <th className="max-lg:px-8">Rota Volta</th>
                    <th className="max-lg:px-8"></th>
                </tr>
            </thead>

            <tbody className="[&_tr]:border-b [&_tr]:border-gray-400">
                {children}
            </tbody>
        </table>
    )
}