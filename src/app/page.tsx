'use client'

import Page from '@/components/Page'
import useHomePage from './useHomePage'
import Search from './Search'
import { EntityTabs, EntityPanels } from '@/components/Entities'

export default function HomePage() {
  const { tab, loading, resultValues, setTab, onSearch } = useHomePage()

  return (
    <Page>
      <div className="glass-box p-4 space-y-8">
        <Search onSearch={onSearch} loading={loading} />
        <div className="space-y-4">
          <EntityTabs
            tab={tab}
            loading={loading}
            results={resultValues}
            onChange={setTab}
          />
          <EntityPanels tab={tab} loading={loading} results={resultValues} />
        </div>
      </div>
    </Page>
  )
}
