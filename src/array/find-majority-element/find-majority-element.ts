/**
 * Given an array of integers, find the majority element in the array.
 * @param arr - the given array
 * @returns the majority element if it exists, otherwise undefined;
 */
export function findMajorityElement(arr: number[]): number {
  arr.sort();
  return arr[Math.floor(arr.length / 2)];
}
