import { Entity, SearchResponse } from '@/constants/types'
import { ReactNode } from 'react'
import EntityPaginator from './EntityPaginator'
import LoadingMask from '../LoadingMask'
import useEntityTable from './useEntityTable'

type EntityTableProps<T extends Entity> = {
  children: ReactNode
  data?: SearchResponse
  onPage?: (res?: SearchResponse<T>) => void
}

export default function EntityTable<T extends Entity>({
  data,
  children,
  onPage,
}: EntityTableProps<T>) {
  const { loading, onPrevious, onNext } = useEntityTable(data, onPage)

  return (
    <div className="min-h-[300px] flex flex-col justify-between space-y-4">
      <div className="relative">
        {loading && <LoadingMask />}
        {children}
      </div>
      {data && data.count > 10 && (
        <EntityPaginator
          data={data}
          loading={loading}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      )}
    </div>
  )
}
