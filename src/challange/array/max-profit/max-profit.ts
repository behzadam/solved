/**
 * The maxProfit function calculates the maximum possible profit from a given array of stock prices.
 * @param prices the given array of prices
 * @returns the maximum possible profit
 */
export function maxProfit(prices: number[]): number {
  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    minPrice = Math.min(minPrice, prices[i]); // Keep track of the minimum price
    maxProfit = Math.max(maxProfit, prices[i] - minPrice); // Update max profit based on current price and min price
  }

  return maxProfit;
}
