/**
 * Shorten an Ethereum address for display.
 * Example:
 *    shortenAddress('0x00000000219ab540356cBB839Cbe05303d7705Fa) => '0x0000…7705Fa'
 */
export function shortenAddress(
  address?: string,
  charsStart = 6,
  charsEnd = 4,
  sep = '…'
) {
  if (!address) return '0x'
  return [address.slice(0, charsStart), address.slice(-charsEnd)].join(sep)
}
