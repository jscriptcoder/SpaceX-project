import { SearchResponse } from '@/constants/types'
import { ReactNode, useCallback, useState } from 'react'
import EntitiesPaginator from './EntitiesPaginator'
import LoadingMask from '../LoadingMask'

type EntityTableProps = {
  children: ReactNode
  data?: SearchResponse
}

export default function EntityTable({ data, children }: EntityTableProps) {
  const [loading, setLoading] = useState(false)

  const onPrevious = useCallback(() => {
    if (!data?.previous) return

    setLoading(true)

    fetch(data.previous)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })
      .finally(() => setLoading(false))
  }, [data?.previous])

  const onNext = useCallback(() => {
    if (!data?.next) return

    setLoading(true)

    fetch(data.next)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })
      .finally(() => setLoading(false))
  }, [data?.next])

  return (
    <div className="min-h-[300px] flex flex-col justify-between space-y-4">
      <div className="relative">
        {loading && <LoadingMask />}
        {children}
      </div>
      {data?.count && data.count > 10 && (
        <EntitiesPaginator
          data={data}
          loading={loading}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      )}
    </div>
  )
}
