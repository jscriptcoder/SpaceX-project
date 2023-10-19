import { Hex } from 'viem'

export function hexLittleEndianToDecimal(hex?: Hex) {
  if (!hex) return BigInt(0)

  let sanitizedHex = hex as string

  // Remove "0x" prefix if it exists
  if (hex.startsWith('0x')) {
    sanitizedHex = hex.slice(2)
  }

  // Split into bytes and reverse
  let byteChunks = []
  for (let i = 0; i < sanitizedHex.length; i += 2) {
    byteChunks.push(sanitizedHex.slice(i, i + 2))
  }

  byteChunks.reverse()

  // Convert to big-endian hexadecimal string and then to decimal
  let bigEndianHexString = byteChunks.join('')
  return BigInt(`0x${bigEndianHexString}`)
}
