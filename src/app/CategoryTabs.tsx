import { SearchCategory, SearchResultValue } from '@/constants/types'
import { useMemo, useState } from 'react'

type TabsProps = {
  loading: boolean
  resultValues: SearchResultValue[]
}

export default function CategoryTabs({ loading, resultValues }: TabsProps) {
  const [tab, setTab] = useState(SearchCategory.ALL)
  const totalItems = useMemo(
    () => resultValues.reduce((acc, val) => acc + (val?.data?.count || 0), 0),
    [resultValues]
  )

  return (
    <div className="tabs">
      {Object.values(SearchCategory).map((category) => {
        const count =
          category === SearchCategory.ALL
            ? totalItems
            : resultValues.find((val) => val.category === category)?.data
                ?.count || 0
        return (
          <div key={category} className="indicator">
            <span className="indicator-item badge badge-primary text-[10px]">
              {count}
            </span>
            <button
              className={`tab tab-lg tab-bordered capitalize ${
                tab === category ? 'tab-active' : ''
              }`}
              onClick={() => setTab(category)}
            >
              {category}
            </button>
          </div>
        )
      })}
    </div>
  )
}
