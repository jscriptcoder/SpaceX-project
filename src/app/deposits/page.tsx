'use client'

import Page from '@/components/Page'
import useDepositsPage from './useDepositsPage'
import { truncateString } from '@/utils/truncateString'
import { hexLittleEndianToDecimal } from '@/utils/hexLittleEndianToDecimal'
import Connected from '@/components/Connected'
import Paginator from './Paginator'
import { defaultPageSize } from '@/constants/config'

export default function DepositsPage() {
  const { logs, totalLogs, chain, page, setPage } = useDepositsPage()

  return (
    <Page>
      <Connected>
        <div className="glass-box overflow-x-auto h-[400px]">
          <table className="table table-lg table-pin-rows">
            <thead>
              <tr>
                <th>Transaction Hash</th>
                <th align="center">Block</th>
                <th align="center">Log Index</th>
                <th align="right">Amount</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => {
                const key = `${log.blockHash}-${log.transactionHash}-${log.logIndex}`
                const explorerUrl = chain?.blockExplorers?.default.url
                const txHash = truncateString(log.transactionHash, 20)
                const txUrl = `${explorerUrl}/tx/${log.transactionHash}`
                const blockNumber = log.blockNumber.toString()
                const blockUrl = `${explorerUrl}/block/${blockNumber}`

                // TODO: explain this
                const amountInGwei = hexLittleEndianToDecimal(log.args.amount)
                const amount = `${amountInGwei / BigInt(10 ** 9)} ETH` // 1 ETH = 10^9 Gwei

                return (
                  <tr key={key}>
                    <td>
                      <a
                        className="link link-secondary"
                        href={txUrl}
                        target="_blank"
                      >
                        {txHash}
                      </a>
                    </td>
                    <td align="center">
                      <a
                        className="link link-secondary"
                        href={blockUrl}
                        target="_blank"
                      >
                        {blockNumber}
                      </a>
                    </td>
                    <td align="center">{log.logIndex}</td>
                    <td align="right">{amount}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <Paginator
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
