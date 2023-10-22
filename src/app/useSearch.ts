import { SearchCategory, searchCategories } from '@/constants/category'
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from 'react'

export type OnSearch = (term: string, category: SearchCategory) => void

export default function useSearch(onSearch: OnSearch) {
  const [term, setTerm] = useState('')
  const [category, setCategory] = useState(searchCategories[0])

  const onInputChange: FormEventHandler = useCallback((event) => {
    const target = event.target as HTMLInputElement
    setTerm(target.value)
  }, [])

  const onSelectChange: ChangeEventHandler = useCallback((event) => {
    const target = event.target as HTMLInputElement
    const category = target.value as SearchCategory
    setCategory(category)
  }, [])

  const clickSearch = useCallback(() => {
    onSearch(term, category)
  }, [term, category, onSearch])

  const clickReset = useCallback(() => {
    setTerm('')
    setCategory(searchCategories[0])

    onSearch('', searchCategories[0])
  }, [onSearch])

  return {
    term,
    category,
    clickReset,
    clickSearch,
    onInputChange,
    onSelectChange,
  }
}
