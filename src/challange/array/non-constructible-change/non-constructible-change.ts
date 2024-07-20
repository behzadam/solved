/**
 * This function calculates the smallest non-constructible change given an array of coins.
 * @param coins - the given array
 * @returnn the smallest non-constructible change
 */
export function nonConstructibleChange(coins: number[]): number {
  // Sort the coins in ascending order
  coins.sort((a, b) => a - b);

  // Keep track of the current amount of change we can create
  let currentChange = 0;

  // Iterate through the sorted coins
  for (const coin of coins) {
    // If the current coin is greater than the amount we can create + 1,
    // then the smallest non-constructible change is currentChange + 1
    if (coin > currentChange + 1) {
      return currentChange + 1;
    }

    // Otherwise, add the current coin to the amount we can create
    currentChange += coin;
  }

  // If we reach the end without finding a gap, the smallest non-constructible change
  // is the sum of all coins + 1
  return currentChange + 1;
}
