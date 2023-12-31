import { getWebsocketClient } from '@/clients/websocketClient'
import {
  depositEventABI,
  depositContractAddress,
  initialBlock,
  defaultPageSize,
} from '@/constants/config'
import { useEffect, useMemo, useState } from 'react'
import { parseAbiItem } from 'viem'
import { useNetwork } from 'wagmi'
import { Log } from './types'

export default function useDepositsPage() {
  const [page, setPage] = useState(1)
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(false)
  const { chain } = useNetwork()

  // Works out which logs to display based on the current page and page size
  // TODO: we might want to extract this logic into an unit-test it
  const logsToDisplay = useMemo(() => {
    const start = (page - 1) * defaultPageSize
    const end = start + defaultPageSize
    return logs.slice(start, end)
  }, [page, logs])

  useEffect(() => {
    const websocketClient = getWebsocketClient(chain)

    setLoading(true)

    // Let's get the latest logs for the event DepositEvent.
    // First we need to create a filter to listen for new events
    // that can be used with getFilterChanges
    websocketClient
      .createEventFilter({
        address: depositContractAddress,
        event: parseAbiItem(depositEventABI),
        fromBlock: initialBlock,
      })
      .then((filter) => websocketClient.getFilterLogs({ filter }))
      .then((prevLogs) => {
        // Sort the logs by block number and logIndex in descending order
        // TODO: this could be an utility function and unit-test it
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
      .finally(() => setLoading(false))

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
    loading,
    setPage,
  }
}
