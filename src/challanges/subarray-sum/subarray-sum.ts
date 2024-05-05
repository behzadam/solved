export function subArraySum(arr: number[], sum: number) {
  const size = arr.length;
  let currentSum = 0;
  const result: number[] = [];

  for (let i = 0; i < size; i++) {
    currentSum = arr[i];
    for (let j = i + 1; j <= size; j++) {
      if (currentSum === sum) {
        result.push(i);
        result.push(j - 1);
        break;
      }
      if (currentSum > sum || j === size) break;
      currentSum += arr[j];
    }
  }

  return result;
}
