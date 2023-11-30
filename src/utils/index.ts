import { formatEther } from 'viem';
import { DateTime } from 'luxon';

/**
 * Shorten an address
 * @param {string} address - The address to shorten
 * @param {number} [charsLength=4] - The number of chars on at the start AND end
 * @returns {string} Formatted address (0xABC...123)
 */
export function shortenAddress(address: string, charsLength = 4): string {
  const prefixLength = 2; // "0x"
  if (!address) {
    return '';
  }
  if (address.length < charsLength * 2 + prefixLength) {
    return address;
  }
  return address.slice(0, charsLength + prefixLength) + '…' + address.slice(-charsLength);
}

export function weiToEther(wei: bigint | string, decimals = 2, strict = false): number {
  try {
    const weiAmount = BigInt(wei);

    if (weiAmount == 0n) {
      return 0;
    }

    let decimalFilter = new RegExp(`(\\.0*\\d{${decimals}})\\d+`);
    if (strict) {
      decimalFilter = new RegExp(`(\\.\\d{${decimals}})\\d+`);
    }
    const value = formatEther(weiAmount).replace(decimalFilter, '$1');

    return parseFloat(value);
  } catch {
    return 0;
  }
}

export function prettierEthers(num: string | number): string {
  return (
    num
      .toString()
      .trim()
      // remove all leading zeros before the decimal point
      // and all trailing zeros after the decimal point in a number,
      // while also preserving the sign
      .replace(/^(-)?0+(?=\d)|\.0+$/g, '$1')
      // add commas
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
  );
}

/**
 * Format a number in wei to a prettier string in ETH
 * @param {bigint | string} wei - The amount in wei
 * @param {number} [decimals = 2] - The number of decimals to show
 * @param {boolean} [strict = false] - If true, will show all decimals
 * @returns {string} Formatted number
 */
export function prettierNumber(wei: bigint | string, decimals = 2, strict = false): string {
  return prettierEthers(weiToEther(wei, decimals, strict));
}

export function formatDate(ts: number): string {
  return DateTime.fromSeconds(ts).toFormat('MMM dd, yyyy');
}
