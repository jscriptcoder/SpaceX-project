import { useCallback, useMemo, useState } from 'react'

type PaginatorProps = {
  page: number
  totalItems: number
  pageSize?: number
  buttonsToShow?: number
  pageChange?: (page: number) => void
}

export default function Paginator({
  page,
  totalItems,
  pageSize = 5,
  buttonsToShow = 5,
  pageChange = () => {},
}: PaginatorProps) {
  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize]
  )
  const buttons = useMemo(
    () => Math.min(buttonsToShow, totalPages),
    [buttonsToShow, totalPages]
  )

  const startPage = useMemo(
    () => Math.max(1, page - Math.floor(buttons / 2)),
    [page, buttons]
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
      <button
        className="join-item btn"
        onClick={() => pageChange(1)}
        disabled={page === 1}
      >
        First
      </button>
      <button
        className="join-item btn"
        onClick={() => pageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={`join-item btn ${
            p === page ? 'btn-primary btn-active' : ''
          }`}
          onClick={() => pageChange(p)}
        >
          {p}
        </button>
      ))}
      <button
        className="join-item btn"
        onClick={() => pageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
      <button
        className="join-item btn"
        onClick={() => pageChange(totalPages)}
        disabled={page === totalPages}
      >
        Last
      </button>
    </div>
  )
}
