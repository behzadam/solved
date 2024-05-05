/**
 * Given an integer array sorted in non-decreasing order,
 * return an array of the squares of each number sorted in non-decreasing order.
 *
 * O(nlogon) time | O(n) space
 * @param array the given array
 * @returns sorted squared array
 */
export function sortedSquaredArray(array: number[]): number[] {
  const sortedQuares = Array.from<number>({ length: array.length }).fill(0);

  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    sortedQuares[i] = value * value;
  }

  sortedQuares.sort((a, b) => a - b);
  return sortedQuares;
}
