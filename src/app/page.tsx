'use client'

import Page from '@/components/Page'
import CategoryTabs from '@/components/CategoryTabs'
import useHomePage from './useHomePage'
import { SearchCategory } from '@/constants/types'

export default function HomePage() {
  const {
    loading,
    category,
    categories,
    resultValues,
    setSearch,
    setCategory,
  } = useHomePage()

  return (
    <Page>
      <div className="glass-box p-4 space-y-8">
        <div className="join">
          <input className="input join-item" placeholder="Search by name…" />
          <select className="select join-item">
            {categories.map((category) => (
              <option key={category} value={category} className="capitalize">
                {category}
              </option>
            ))}
          </select>
        </div>
        <CategoryTabs
          selected={category}
          categories={categories}
          resultValues={resultValues}
          onSelect={setCategory}
        />
      </div>
    </Page>
  )
}
