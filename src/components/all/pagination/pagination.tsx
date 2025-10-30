import PaginationButton from "./pagination-button"

interface PageItem {
    type: "page" | "elipsis"
    page: number
    text: string
    key: string
}

interface Props {
    totalPages: number
    currentPage: number
    maxVisiblePages?: number
    setPage: (page: number) => void
}

export default function Pagination({ totalPages, currentPage, maxVisiblePages = 3, setPage }: Props) {
    const generatePages = (): PageItem[] => {
        const pages: PageItem[] = []
        const halfVisible: number = Math.floor(maxVisiblePages / 2)

        let startPage: number = Math.max(2, currentPage - halfVisible)
        let endPage: number = Math.min(totalPages, currentPage + halfVisible)

        pages.push({ type: "page", page: 1, text: "1", key: "page-1" })

        if (currentPage <= halfVisible) {
            endPage = Math.min(totalPages, maxVisiblePages)
        }

        if (currentPage >= totalPages - (halfVisible - 1)) {
            startPage = Math.max(2, totalPages - maxVisiblePages + 1)
        }

        if (startPage > 2) {
            pages.push({ type: "elipsis", page: currentPage - maxVisiblePages, text: "...", key: "elipsis-start" })
        }

        for (let i = startPage; i <= endPage; i++) {
            if (i != totalPages) {
                pages.push({ type: "page", page: i, text: String(i), key: `page-${i}` })
            }
        }

        if (endPage < totalPages - 1) {
            pages.push({ type: "elipsis", page: currentPage + maxVisiblePages, text: "...", key: "elipsis-end" })
        }

        if (totalPages > 1) {
            pages.push({ type: "page", page: totalPages, text: String(totalPages), key: `page-${totalPages}` })
        }

        return pages
    }

    const handlePageChange = (pageItem: PageItem): void => {
        setPage(pageItem.page)
    }

    const pages = generatePages()

    return (
        <div className="flex gap-3">
            {pages.map((pageItem) => {
                return (
                    <PaginationButton
                        key={pageItem.key}
                        text={String(pageItem.text)}
                        callback={() => { handlePageChange(pageItem) }}
                        active={pageItem.page === currentPage}
                    />
                )
            })}
        </div>
    )
}