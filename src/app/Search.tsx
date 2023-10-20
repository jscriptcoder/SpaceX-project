import { SearchCategory } from '@/constants/types'
import { useMemo } from 'react'
import { MdSearch } from 'react-icons/md'

export default function Search() {
  return (
    <div className="join">
      <input
        className="input input-primary join-item w-[300px]"
        placeholder="Search term…"
      />
      <select className="select select-primary join-item">
        {Object.values(SearchCategory).map((category) => (
          <option key={category} value={category}>
            {category.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-outline btn-primary join-item">
        <MdSearch className="w-8 h-8" />
      </button>
    </div>
  )
}
