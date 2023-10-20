import type { Address, Hex, Hash } from 'viem'

export type Log = {
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
