import { SearchCategory, SearchResultValue } from '@/constants/types'
import { useMemo } from 'react'

type TabsProps = {
  selected: SearchCategory
  categories: SearchCategory[]
  resultValues: SearchResultValue[]
  onSelect: (category: SearchCategory) => void
}

export default function CategoryTabs({
  selected,
  categories,
  resultValues,
  onSelect,
}: TabsProps) {
  const totalItems = useMemo(
    () => resultValues.reduce((acc, val) => acc + (val?.data?.count || 0), 0),
    [resultValues]
  )

  return (
    <div className="tabs">
      {categories.map((cat) => {
        const count =
          cat === SearchCategory.ALL
            ? totalItems
            : resultValues.find((val) => val.category === cat)?.data?.count || 0
        return (
          <div key={cat} className="indicator">
            <span className="indicator-item badge badge-primary text-[10px]">
              {count}
            </span>
            <button
              className={`tab tab-lg tab-bordered capitalize ${
                selected === cat ? 'tab-active' : ''
              }`}
              onClick={() => onSelect(cat)}
            >
              {cat}
            </button>
          </div>
        )
      })}
    </div>
  )
}
