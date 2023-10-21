import { SearchResponse } from '@/constants/types'

type EntityTableProps = {
  data: SearchResponse
  loading: boolean
  onPrevious?: () => void
  onNext?: () => void
}

export default function EntitiesPaginator({
  data,
  loading,
  onPrevious,
  onNext,
}: EntityTableProps) {
  return (
    <div className="flex justify-center">
      <div className="join grid grid-cols-2">
        <button
          disabled={!data?.previous || loading}
          className="join-item btn btn-secondary btn-outline btn-sm"
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          disabled={!data?.next || loading}
          className="join-item btn btn-secondary btn-outline btn-sm"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  )
}
