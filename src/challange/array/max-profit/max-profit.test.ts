import { maxProfit } from "./max-profit";
describe("maxProfit", () => {
  it("returns 0 when the prices array is empty", () => {
    const prices = [] as number[];
    const result = maxProfit(prices);
    expect(result).toBe(0);
  });

  it("returns 0 when the prices array has only one element", () => {
    const prices = [10];
    const result = maxProfit(prices);
    expect(result).toBe(0);
  });

  it("returns the maximum profit when prices are decreasing", () => {
    const prices = [10, 9, 8, 7, 6];
    const result = maxProfit(prices);
    expect(result).toBe(0);
  });

  it("returns the maximum profit when prices are increasing", () => {
    const prices = [6, 7, 8, 9, 10];
    const result = maxProfit(prices);
    expect(result).toBe(4);
  });

  it("returns the maximum profit when prices fluctuate", () => {
    const prices = [7, 1, 5, 3, 6, 4];
    const result = maxProfit(prices);
    expect(result).toBe(5);
  });
});
