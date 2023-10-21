'use client'

import Page from '@/components/Page'
import useHomePage from './useHomePage'
import Search from './Search'
import { CategoryTabs, CategoryPanels } from '@/components/CategoryTabs'

export default function HomePage() {
  const { tab, loading, resultValues, setTab, onSearch } = useHomePage()

  return (
    <Page>
      <div className="glass-box p-4 space-y-8">
        <Search onSearch={onSearch} />
        <CategoryTabs
          tab={tab}
          loading={loading}
          results={resultValues}
          onChange={setTab}
        />
        <CategoryPanels tab={tab} loading={loading} results={resultValues} />
      </div>
    </Page>
  )
}
