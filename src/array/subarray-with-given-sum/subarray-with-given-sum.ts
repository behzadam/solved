/**
 * Finds a subarray of a given array that sums up to a given target and returns its indices.
 * @param arr - the array of numbers
 * @param target - the target sum
 */
export function subarrayWithGivenSum(arr: number[], target: number): number[] {
  // If the array is empty, return an empty array.
  if (arr.length === 0) {
    return [];
  }

  // If the array has only one element, check if it is equal to the target.
  if (arr.length === 1) {
    return arr[0] === target ? [0] : [];
  }

  // If the array has two elements, check if either of them is equal to the target or if their sum is equal to the target.
  if (arr.length === 2) {
    if (arr[0] === target || arr[1] === target) {
      return [arr[0] === target ? 0 : 1];
    } else if (arr[0] + arr[1] === target) {
      return [0, 1];
    } else {
      return [];
    }
  }

  let start = 0;
  let end = 0;
  let sum = arr[0];

  while (end < arr.length) {
    if (sum === target) {
      return [start, end];
    } else if (sum < target) {
      end++;
      sum += arr[end];
    } else {
      sum -= arr[start];
      start++;
    }
  }
  return [];
}
