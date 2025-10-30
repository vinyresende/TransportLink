interface Props {
    children: React.ReactNode | React.ReactNode[]
}

export default function RecordTable({ children }: Props) {
    return (
        <table className="w-full min-lg:table-fixed mt-5">
            <thead>
                <tr className="h-10 border-b border-gray-400">
                    <th className="max-lg:px-8 text-start px-1" colSpan={2}>Nome da rota</th>
                    <th className="max-lg:px-8 text-start px-1" colSpan={2}>Motorista</th>
                    <th className="max-lg:px-8">Placa do veículo</th>
                    <th className="max-lg:px-8">Recorrência anual</th>
                    <th className="max-lg:px-8">Distância (KM)</th>
                    <th className="max-lg:px-8"></th>
                </tr>
            </thead>

            <tbody className="[&_tr]:border-b [&_tr]:border-gray-400">
                {children}
            </tbody>
        </table>
    )
}