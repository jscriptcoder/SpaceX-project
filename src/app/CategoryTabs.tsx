import { SearchCategory, categories } from '@/constants/category'
import { SearchResultValue } from '@/constants/types'
import { useMemo, useState } from 'react'
import LoadingTabs from './LoadingTabs'

type TabsProps = {
  loading: boolean
  resultValues: SearchResultValue[]
}

export default function CategoryTabs({ loading, resultValues }: TabsProps) {
  const [tab, setTab] = useState<SearchCategory | undefined>()
  const totalItems = useMemo(
    () => resultValues.reduce((acc, val) => acc + (val?.data?.count || 0), 0),
    [resultValues]
  )

  if (loading) return <LoadingTabs tabs={categories.length} />

  return (
    <div className="tabs">
      {resultValues.map((result) => {
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
