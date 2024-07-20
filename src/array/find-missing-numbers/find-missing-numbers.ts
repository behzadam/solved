/**
 *  Find missing numbers in a given array.
 *
 * @example
 * ```ts
 * const arr = [1, 2, 8];
 * const result = findMissingNumber(arr);
 * console.log("Result:  ", result);
 * // Result:  [3, 4, 5, 6, 7]
 * ```
 *
 * @param arr - the given array
 * @returns array of the missing numbers or empty array if all numbers are present.
 */
export function findMissingNumbers(arr: number[]): number[] {
  if (arr.length === 0) return [];

  // All expected numbers from 1 to maximum value in the array
  const expectedSet = new Set([...Array(Math.max(...arr) + 1).keys()].slice(1));
  // Remove duplicated items
  const actualSet = new Set(arr);
  // Then filter the array
  const missingElements = [...expectedSet].filter((x) => !actualSet.has(x));
  return missingElements;
}
