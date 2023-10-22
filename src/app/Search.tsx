import { searchCategories } from '@/constants/category'
import { MdSearch } from 'react-icons/md'
import useSearch, { OnSearch } from './useSearch'

type SearchProps = {
  onSearch: OnSearch
}

export default function Search({ onSearch }: SearchProps) {
  const { clickSearch, onInputChange, onSelectChange } = useSearch(onSearch)

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
