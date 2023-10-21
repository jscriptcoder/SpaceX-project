import { searchCategories } from '@/constants/category'
import { MdSearch } from 'react-icons/md'

export default function Search() {
  return (
    <div className="join">
      <input className="input join-item w-[300px]" placeholder="Search term…" />
      <select className="select join-item">
        {searchCategories.map((category) => (
          <option key={category} value={category}>
            {category.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-primary join-item">
        <MdSearch className="w-8 h-8" />
      </button>
    </div>
  )
}
