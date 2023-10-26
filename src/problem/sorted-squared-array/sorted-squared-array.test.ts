import { sortedSquaredArray } from "./sorted-squared-array";

describe("sortedSquaredArray", () => {
  it("returns sorted and squared array of numbers", () => {
    expect(sortedSquaredArray([-4, -1, 0, 3, 10])).toEqual([0, 1, 9, 16, 100]);
    expect(sortedSquaredArray([1, 2, 3, 4, 5])).toEqual([1, 4, 9, 16, 25]);
    expect(sortedSquaredArray([5, -1, 3])).toEqual([1, 9, 25]);
  });
});
