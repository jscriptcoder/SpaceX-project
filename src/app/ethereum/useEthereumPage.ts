import { getWebsocketClient } from '@/clients/websocketClient'
import {
  DEPOSITE_EVENT_ABI,
  ETHEREUM_DEPOSIT_CONTRACT_ADDRESS,
  FROM_BLOCK,
} from '@/constants'
import { useEffect, useRef, useState } from 'react'
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

export default function useWatchDepositeEvent() {
  const [logs, setLogs] = useState<Log[]>([])
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

        // Add the new logs to the beginning of the array
        setLogs((prevLogs) => [...newLogs, ...prevLogs])
      },
      address: ETHEREUM_DEPOSIT_CONTRACT_ADDRESS,
      event: parseAbiItem(DEPOSITE_EVENT_ABI),
    })

    return unwatch
  }, [chain])

  return { logs, chain }
}
