'use client'

import Page from '@/components/Page'
import useEthereumPage from './useEthereumPage'
import { truncateString } from '@/utils/truncateString'

export default function EthereumPage() {
  const { logs, chain } = useEthereumPage()

  return (
    <Page>
      <div className="glass-box overflow-x-auto h-[500px]">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th>Block</th>
              <th>Tx Hash</th>
              <th align="center">Log Idx</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => {
              const key = `${log.blockHash}-${log.transactionHash}-${log.logIndex}`
              const explorerUrl = chain?.blockExplorers?.default.url
              const blockNumber = log.blockNumber.toString()
              const blockUrl = `${explorerUrl}/block/${blockNumber}`
              const txUrl = `${explorerUrl}/tx/${log.transactionHash}`

              return (
                <tr key={key}>
                  <td>
                    <a className="link link-secondary" href={blockUrl}>
                      {blockNumber}
                    </a>
                  </td>
                  <td>
                    <a className="link link-secondary" href={txUrl}>
                      {truncateString(log.transactionHash, 20)}
                    </a>
                  </td>
                  <td align="center">{log.logIndex}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Page>
  )
}
