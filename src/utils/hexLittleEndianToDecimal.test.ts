import { hexLittleEndianToDecimal } from './hexLittleEndianToDecimal'

// https://www.save-editor.com/tools/wse_hex.html
describe('hexLittleEndianToDecimal', () => {
  it('should convert a hexadecimal string in little-endian format to a decimal number', () => {
    expect(hexLittleEndianToDecimal('0x00405973070000')).toBe(
      BigInt(32000000000)
    )
    expect(hexLittleEndianToDecimal('0x00ca9a3b00000000')).toBe(
      BigInt(1000000000)
    )
    expect(hexLittleEndianToDecimal('0x0076be3707000000')).toBe(
      BigInt(31000000000)
    )
  })
})
