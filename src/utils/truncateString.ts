/**
 * Truncate a string to a certain length.
 * Example:
 *    truncateString('Hello world!', 5) => 'Hello…'
 */
export function truncateString(
  str: string,
  maxlength: number,
  strBoundary = '…'
) {
  return str.length > maxlength
    ? `${str.substring(0, maxlength)}${strBoundary}`
    : str
}
