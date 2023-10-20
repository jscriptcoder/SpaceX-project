'use client'

import Page from '@/components/Page'
import useDepositsPage from './useDepositsPage'
import Connected from '@/components/Connected'
import LogsPaginator from './LogsPaginator'
import { defaultPageSize } from '@/constants/config'
import DepositsTable from './DepositsTable'

export default function DepositsPage() {
  const { logs, totalLogs, page, setPage } = useDepositsPage()

  return (
    <Page>
      <Connected>
        <div className="glass-box overflow-x-auto h-[400px]">
          <DepositsTable logs={logs} />
        </div>
        <div className="flex justify-end mt-4">
          <LogsPaginator
            page={page}
            totalItems={totalLogs}
            pageSize={defaultPageSize}
            pageChange={setPage}
          />
        </div>
      </Connected>
    </Page>
  )
}
