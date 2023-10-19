'use client'

import Page from '@/components/Page'
import useEthereumPage from './useEthereumPage'
import { truncateString } from '@/utils/truncateString'
import { hexLittleEndianToDecimal } from '@/utils/hexLittleEndianToDecimal'

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
              const amountInGwei = hexLittleEndianToDecimal(log.args.amount)
              const amount = `${amountInGwei / BigInt(10 ** 9)} ETH`

              return (
                <tr key={key}>
                  <td>
                    <a
                      className="link link-secondary"
                      href={blockUrl}
                      target="_blank"
                    >
                      {blockNumber}
                    </a>
                  </td>
                  <td>
                    <a
                      className="link link-secondary"
                      href={txUrl}
                      target="_blank"
                    >
                      {txHash}
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
    </Page>
  )
}
