import { Entity, SearchResponse, SearchResultValue } from '@/constants/types'
import { ReactNode } from 'react'

type EntityTableProps = {
  children: ReactNode
  data?: SearchResponse
}

export default function EntityTable({ data, children }: EntityTableProps) {
  return (
    <div className="min-h-[300px] flex flex-col justify-between space-y-4">
      <div>{children}</div>
      {data?.count && data.count > 10 && (
        <div className="flex justify-center">
          <div className="join grid grid-cols-2">
            <button
              disabled={!data?.previous}
              className="join-item btn btn-secondary btn-outline btn-sm"
            >
              Previous
            </button>
            <button
              disabled={!data?.next}
              className="join-item btn btn-secondary btn-outline btn-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
