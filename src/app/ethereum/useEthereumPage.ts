import { getWebsocketClient } from '@/clients/websocketClient'
import {
  DEPOSITE_EVENT_ABI,
  ETHEREUM_DEPOSIT_CONTRACT_ADDRESS,
  FROM_BLOCK,
} from '@/constants'
import { useEffect, useState } from 'react'
import { GetFilterLogsReturnType, parseAbiItem } from 'viem'
import { useNetwork } from 'wagmi'

export default function useWatchDepositeEvent() {
  const [logs, setLogs] = useState<GetFilterLogsReturnType>([])
  const { chain } = useNetwork()

  useEffect(() => {
    const websocketClient = getWebsocketClient(chain)

    // Let's get the latest logs for the event DepositEvent
    websocketClient
      .createEventFilter({
        address: ETHEREUM_DEPOSIT_CONTRACT_ADDRESS,
        event: parseAbiItem(DEPOSITE_EVENT_ABI),
        fromBlock: FROM_BLOCK,
      })
      .then((filter) => websocketClient.getFilterLogs({ filter }))
      .then((prevLogs) => {
        console.log('Previous logs:', prevLogs)
        setLogs(prevLogs)
      })

    // Start watching for new logs
    const unwatch = websocketClient.watchEvent({
      onLogs: (newLogs) => {
        console.log('New logs:', newLogs)

        // WARNING: mutation!!
        logs.unshift(...newLogs)
        setLogs(logs)
      },
      address: ETHEREUM_DEPOSIT_CONTRACT_ADDRESS,
      event: parseAbiItem(DEPOSITE_EVENT_ABI),
    })

    return unwatch
  }, [chain])

  return { logs, chain }
}
