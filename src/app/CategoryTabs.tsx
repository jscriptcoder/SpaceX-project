import { SearchCategory, categories } from '@/constants/category'
import { SearchResultValue } from '@/constants/types'
import LoadingTabs from './LoadingTabs'

type CategoryTabsProps = {
  tab: SearchCategory
  loading: boolean
  results: SearchResultValue[]
  onChange?: (category: SearchCategory) => void
}

export default function CategoryTabs({
  tab,
  loading,
  results = [],
  onChange = () => {},
}: CategoryTabsProps) {
  if (loading) return <LoadingTabs tabs={categories.length} />

  if (results.length === 0) {
    // TODO
    return <div>No results found</div>
  }

  return (
    <div className="tabs">
      {results.map((result) => {
        const category = result.category
        const count = result.data?.count || 0
        return (
          <div key={category} className="indicator">
            <span className="indicator-item badge badge-primary text-[10px]">
              {count}
            </span>
            <button
              className={`tab tab-lg tab-bordered capitalize ${
                tab === category ? 'tab-active' : ''
              }`}
              onClick={() => onChange(category)}
            >
              {category}
            </button>
          </div>
        )
      })}
    </div>
  )
}
