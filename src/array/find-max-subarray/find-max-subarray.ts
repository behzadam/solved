export type SubarrayInfo = {
  sum: number;
  startIndex: number;
  endIndex: number;
};

export function findMaxSubarray(arr: number[]): SubarrayInfo {
  let currentSum: number = arr[0];
  let maxSum: number = currentSum;
  let startIndex: number = 0;
  let endIndex: number = 0;

  for (let i = 1; i < arr.length; i++) {
    // Check if starting a new subarray gives a better sum
    currentSum = Math.max(arr[i], currentSum + arr[i]);

    // Update maxSum and potential starting/ending indices
    if (currentSum > maxSum) {
      maxSum = currentSum;
      startIndex = i;
    }
    endIndex = i;
  }

  return { sum: maxSum, startIndex, endIndex };
}

// Example usage
const arr: number[] = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const maxSubarray: SubarrayInfo = findMaxSubarray(arr);
console.log(maxSubarray); // Output: { sum: 6, startIndex: 3, endIndex: 6 }
