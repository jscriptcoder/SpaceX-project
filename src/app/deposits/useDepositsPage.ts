import { getWebsocketClient } from '@/clients/websocketClient'
import {
  depositEventABI,
  depositContractAddress,
  initialBlock,
  defaultPageSize,
} from '@/constants/config'
import { useEffect, useMemo, useState } from 'react'
import { Address, Hash, Hex, parseAbiItem } from 'viem'
import { useNetwork } from 'wagmi'

type Log = {
  address: Address
  blockHash: Hash
  blockNumber: bigint
  logIndex: number
  transactionHash: Hash
  transactionIndex: number
  args: {
    amount?: Hex
  }
}

export default function useDepositsPage() {
  const [page, setPage] = useState(1)
  const [logs, setLogs] = useState<Log[]>([])
  const { chain } = useNetwork()

  const logsToDisplay = useMemo(() => {
    const start = (page - 1) * defaultPageSize
    const end = start + defaultPageSize
    return logs.slice(start, end)
  }, [page, logs])

  useEffect(() => {
    const websocketClient = getWebsocketClient(chain)

    // Let's get the latest logs for the event DepositEvent
    websocketClient
      .createEventFilter({
        address: depositContractAddress,
        event: parseAbiItem(depositEventABI),
        fromBlock: initialBlock,
      })
      .then((filter) => websocketClient.getFilterLogs({ filter }))
      .then((prevLogs) => {
        // Sort the logs by block number and logIndex in descending order
        const sorted = prevLogs.sort((log1, log2) => {
          // We sort by block number first
          if (log1.blockNumber !== log2.blockNumber) {
            return Number(log2.blockNumber - log1.blockNumber)
          }

          // If the block numbers are the same, we sort by logIndex
          return log2.logIndex - log1.logIndex
        })

        console.log('Previous logs:', sorted)
        setLogs(sorted)
      })

    // Start watching for new logs
    const unwatch = websocketClient.watchEvent({
      onLogs: (newLogs) => {
        console.log('New log:', newLogs[0])

        // Add the new log to the beginning of the array
        setLogs((prevLogs) => [newLogs[0], ...prevLogs])
      },
      address: depositContractAddress,
      event: parseAbiItem(depositEventABI),
    })

    return unwatch
  }, [chain])

  return {
    logs: logsToDisplay,
    totalLogs: logs.length,
    page,
    chain,
    setPage,
  }
}
