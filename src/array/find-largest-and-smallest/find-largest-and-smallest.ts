export type LargestAndSmallest = {
  largest: number | undefined;
  smallest: number | undefined;
};

/**
 * Given an array of numbers, returns the largest and smallest values from the given array.
 * @param numbers - the given array
 * @returns the largest and smallest values from the given array.
 */
export function findLargestAndSmallest(numbers: number[]): LargestAndSmallest {
  if (numbers.length === 0) {
    return {
      largest: undefined,
      smallest: undefined,
    };
  }

  const largest = Math.max(...numbers);
  const smallest = Math.min(...numbers);

  return {
    largest,
    smallest,
  };
}

/*
// Another way to solve this problem
function findLargestAndSmallest(numbers: number[]): {
  largest: number;
  smallest: number;
} {
  if (numbers.length === 0) {
    return {
      largest: undefined,
      smallest: undefined,
    };
  }

  let largest: number = numbers[0];
  let smallest: number = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > largest) {
      largest = numbers[i];
    } else if (numbers[i] < smallest) {
      smallest = numbers[i];
    }
  }

  return {
    largest,
    smallest,
  };
}**/
