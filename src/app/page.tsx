'use client'

import Page from '@/components/Page'
import CategoryTabs from './CategoryTabs'
import useHomePage from './useHomePage'
import Search from './Search'

export default function HomePage() {
  const { loading, resultValues, setSearch, setCategory } = useHomePage()

  return (
    <Page>
      <div className="glass-box p-4 space-y-8">
        <Search />
        <CategoryTabs resultValues={resultValues} loading={loading} />
      </div>
    </Page>
  )
}
