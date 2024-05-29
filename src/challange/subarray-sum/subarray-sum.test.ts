import { subArraySum } from "./subarray-sum";

describe("subArraySum", () => {
  it("returns sorted and squared array of numbers", () => {
    expect(subArraySum([1, 2, 3, 7, 100], 12)).toEqual([1, 3]);
  });
});
