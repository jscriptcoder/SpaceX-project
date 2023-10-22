import { hexLittleEndianToDecimal } from '@/utils/hexLittleEndianToDecimal'
import { truncateString } from '@/utils/truncateString'
import { Address, useNetwork } from 'wagmi'
import { Log } from './types'
import LoadingLogs from './LoadingLogs'

type DepositsTableProps = {
  logs: Log[]
  loading: boolean
}

export default function DepositsTable({ logs, loading }: DepositsTableProps) {
  const { chain } = useNetwork()

  return (
    <table className="table table-lg table-pin-rows">
      <thead>
        <tr>
          <th>Transaction Hash</th>
          <th align="center">Block</th>
          <th align="center">Log Index</th>
          <th align="right">Amount</th>
        </tr>
      </thead>

      {loading && <LoadingLogs rows={8} />}

      {!loading && (
        <tbody>
          {logs.map((log) => {
            const key = `${log.blockHash}-${log.transactionHash}-${log.logIndex}`
            const explorerUrl = chain?.blockExplorers?.default.url
            const txHash = truncateString(log.transactionHash, 20)
            const txUrl = `${explorerUrl}/tx/${log.transactionHash}`
            const blockNumber = log.blockNumber.toString()
            const blockUrl = `${explorerUrl}/block/${blockNumber}`

            // Amount comes formatted as a little endian hex string.
            // We need to convert it to decimal to make it human readable.
            const amountInGwei = log?.args?.amount
              ? hexLittleEndianToDecimal(log.args.amount)
              : BigInt(0)

            // Before transforming to little endian 64-bit hex string, the amount is
            // converted to Gwei. We want to show the amount in ETH.
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
      )}
    </table>
  )
}
