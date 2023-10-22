import { Hex } from 'viem'

/**
 * Converts a hexadecimal string in little-endian format to a decimal number.
 * If you look at the the contract source code,
 * https://etherscan.io/address/0x00000000219ab540356cBB839Cbe05303d7705Fa#code,
 * in line 123, inside `deposit` method, you will see that the contract converts
 * the deposit amount to little endian 64-bit hexadecimal string. If we want to
 * display the deposit amount in decimal format, we need to convert it back to decimal.
 */
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
