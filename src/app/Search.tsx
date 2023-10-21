import { SearchCategory, searchCategories } from '@/constants/category'
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from 'react'
import { MdSearch } from 'react-icons/md'

type SearchProps = {
  onSearch: (term: string, category: SearchCategory) => void
}

export default function Search({ onSearch }: SearchProps) {
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

  return (
    <div className="join">
      <input
        className="input join-item w-[300px]"
        placeholder="Search term…"
        onInput={onInputChange}
      />
      <select className="select join-item" onChange={onSelectChange}>
        {searchCategories.map((category) => (
          <option key={category} value={category}>
            {category.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-primary join-item" onClick={clickSearch}>
        <MdSearch className="w-8 h-8" />
      </button>
    </div>
  )
}
