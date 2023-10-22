import { Entity, SearchResponse, SearchResultValue } from '@/constants/types'
import fetchEntities from '@/utils/fetchEntities'
import { useCallback, useState } from 'react'

export default function useEntityTable<T extends Entity>(
  data?: SearchResponse,
  onPage: (res?: SearchResponse<T>) => void = () => {}
) {
  const [loading, setLoading] = useState(false)

  const onPrevious = useCallback(async () => {
    if (!data?.previous) return

    setLoading(true)

    try {
      const result = await fetchEntities<T>(data.previous)

      console.log('Previous page result:', result)

      onPage(result.data)
    } catch (err) {
      console.error(err)
      // TODO: handle this
    } finally {
      setLoading(false)
    }
  }, [data?.previous, onPage])

  const onNext = useCallback(async () => {
    if (!data?.next) return

    setLoading(true)

    try {
      const result = await fetchEntities<T>(data.next)

      console.log('Next page result:', result)

      onPage(result.data)
    } catch (err) {
      console.error(err)
      // TODO: handle this
    } finally {
      setLoading(false)
    }
  }, [data?.next, onPage])

  return { loading, onPrevious, onNext }
}
