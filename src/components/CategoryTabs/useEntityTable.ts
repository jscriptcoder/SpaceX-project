import { SearchResponse } from '@/constants/types'
import { useCallback, useState } from 'react'

export default function useEntityTable(data?: SearchResponse) {
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

  return { loading, onPrevious, onNext }
}
