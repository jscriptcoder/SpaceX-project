import useLogsPaginator from './useLogsPaginator'

type LogsPaginatorProps = {
  page: number
  totalItems: number
  pageSize?: number
  buttonsToShow?: number
  pageChange?: (page: number) => void
}

export default function LogsPaginator({
  page,
  totalItems,
  pageSize = 5,
  buttonsToShow = 5,
  pageChange = () => {},
}: LogsPaginatorProps) {
  const { pages, totalPages } = useLogsPaginator({
    page,
    pageSize,
    totalItems,
    buttonsToShow,
  })

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
