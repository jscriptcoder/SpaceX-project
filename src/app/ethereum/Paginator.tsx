import { useCallback, useMemo, useState } from 'react'

type PaginatorProps = {
  totalItems: number
  pageSize?: number
  buttonsToShow?: number
}

export default function Paginator({
  totalItems,
  pageSize = 5,
  buttonsToShow = 5,
}: PaginatorProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize]
  )
  const buttons = useMemo(
    () => Math.min(buttonsToShow, totalPages),
    [buttonsToShow, totalPages]
  )

  const startPage = useMemo(
    () => Math.max(1, currentPage - Math.floor(buttons / 2)),
    [currentPage, buttons]
  )

  const endPage = useMemo(
    () => Math.min(totalPages, startPage + buttons - 1),
    [totalPages, startPage, buttons]
  )

  const pages = useMemo(() => {
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => {
      return startPage + i
    })
  }, [startPage, endPage])

  return (
    <div className="join">
      <button className="join-item btn" onClick={() => setCurrentPage(1)}>
        First
      </button>
      <button
        className="join-item btn"
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`join-item btn ${
            page === currentPage ? 'btn-active' : ''
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="join-item btn"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
      <button
        className="join-item btn"
        onClick={() => setCurrentPage(totalPages)}
      >
        Last
      </button>
    </div>
  )
}
