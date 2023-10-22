import { SearchCategory } from '@/constants/category'
import { SearchResultValue } from '@/constants/types'
import { useCallback, useEffect, useState } from 'react'

export default function useHomePage() {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<SearchCategory>(SearchCategory.ALL)
  const [tab, setTab] = useState<SearchCategory>(SearchCategory.PEOPLE)
  const [resultValues, setResultValues] = useState<SearchResultValue[]>([])

  const onSearch = useCallback((_search: string, _category: SearchCategory) => {
    setSearch(_search)
    setCategory(_category)
  }, [])

  useEffect(() => {
    setLoading(true)

    // TODO: add caching system here
    fetch(`/api/search?term=${search}&category=${category}`)
      .then((response) => response.json() as Promise<SearchResultValue[]>)
      .then((data) => {
        console.log('Data fetched:', data)
        setResultValues(data)

        if (data.length > 0) {
          // Select the tab with more results, which is the first one
          // since it's been sorted in the backend already
          setTab(data[0].category)
        }
      })
      .catch((err) => {
        console.error(err)
        // TODO: handle error
      })
      .finally(() => {
        setLoading(false)
      })
  }, [search, category])

  return {
    tab,
    loading,
    resultValues,
    setTab,
    onSearch,
  }
}
