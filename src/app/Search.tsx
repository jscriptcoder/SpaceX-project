import { searchCategories } from '@/constants/category'
import { MdSearch } from 'react-icons/md'
import useSearch, { OnSearch } from './useSearch'

type SearchProps = {
  loading: boolean
  onSearch: OnSearch
}

export default function Search({ loading, onSearch }: SearchProps) {
  const {
    term,
    category,
    clickReset,
    clickSearch,
    onInputChange,
    onSelectChange,
  } = useSearch(onSearch)

  return (
    <div className="flex space-x-4">
      <div className="join">
        <input
          value={term}
          className="input join-item w-[300px]"
          placeholder="Search by name…"
          onInput={onInputChange}
        />
        <select
          value={category}
          className="select join-item"
          onChange={onSelectChange}
        >
          {searchCategories.map((category) => (
            <option key={category} value={category}>
              {category.toUpperCase()}
            </option>
          ))}
        </select>
        <button
          disabled={loading}
          className="btn btn-primary join-item"
          onClick={clickSearch}
        >
          <MdSearch className="w-8 h-8" />
        </button>
      </div>
      <button
        disabled={loading}
        className="btn btn-secondary btn-outline"
        onClick={clickReset}
      >
        Reset
      </button>
    </div>
  )
}
