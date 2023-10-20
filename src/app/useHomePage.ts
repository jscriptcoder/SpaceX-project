import { SearchCategory, SearchResultValue } from '@/constants/types'
import { useEffect, useMemo, useState } from 'react'

export default function useHomePage() {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<SearchCategory>(SearchCategory.ALL)
  const [resultValues, setResultValues] = useState<SearchResultValue[]>([])

  const categories = useMemo(() => Object.values(SearchCategory), [])

  useEffect(() => {
    setLoading(true)
    fetch(`/api/starwar?search=${search}&category=${category}`)
      .then((response) => response.json() as Promise<SearchResultValue[]>)
      .then((data) => setResultValues(data))
      .catch((err) => {
        console.error(err)
        // TODO: handle error
      })
      .finally(() => {
        setLoading(false)
      })
  }, [search, category])

  return {
    loading,
    category,
    categories,
    resultValues,
    setSearch,
    setCategory,
  }
}
