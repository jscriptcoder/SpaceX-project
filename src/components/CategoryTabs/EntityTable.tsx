import { SearchResponse } from '@/constants/types'
import { ReactNode, useCallback, useState } from 'react'
import EntitiesPaginator from './EntitiesPaginator'
import LoadingMask from '../LoadingMask'
import useEntityTable from './useEntityTable'

type EntityTableProps = {
  children: ReactNode
  data?: SearchResponse
}

export default function EntityTable({ data, children }: EntityTableProps) {
  const { loading, onPrevious, onNext } = useEntityTable(data)

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
