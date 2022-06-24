/**
 * A function to convert from one value to another, given a ratio of the input unit to some base unit,
 * and given a ratio of the output unit to the same base unit
 * @param {number} input Input value
 * @param {number} from Input ratio (compared to some base value)
 * @param {number} to Output ratio (compared to some base value)
 * @returns {number}
 */
export function convertFromTo(input: number, from: number, to: number): number {
  return (input / from) * to;
}

/**
 * Numberifies a string
 * @param {string} input input string
 * @param {boolean} [strict=false] If false, coerces all strings to be a valid number, if true can result in NaN as a ReturnValue
 * @returns {number}
 */
export function numberifyString(input: string, strict = false): number {
  const _ = strict ? Number(input) : input.replace(/[^\d.]/g, '');
  return Number(_);
}
