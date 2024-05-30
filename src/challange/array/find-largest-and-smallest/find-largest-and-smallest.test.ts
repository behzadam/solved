import { findLargestAndSmallest } from "./find-largest-and-smallest";

describe("findLargestAndSmallest", () => {
  it("returns undefined for largest and smallest when given an empty array", () => {
    const result = findLargestAndSmallest([]);
    expect(result.largest).toBeUndefined();
    expect(result.smallest).toBeUndefined();
  });

  it("returns the correct largest and smallest values for an array with positive numbers", () => {
    const result = findLargestAndSmallest([5, 2, 8, 1, 9]);
    expect(result.largest).toBe(9);
    expect(result.smallest).toBe(1);
  });

  it("returns the correct largest and smallest values for an array with negative numbers", () => {
    const result = findLargestAndSmallest([-3, -7, -1, -5]);
    expect(result.largest).toBe(-1);
    expect(result.smallest).toBe(-7);
  });

  it("returns the correct largest and smallest values for an array with mixed positive and negative numbers", () => {
    const result = findLargestAndSmallest([-2, 4, -6, 8, 0]);
    expect(result.largest).toBe(8);
    expect(result.smallest).toBe(-6);
  });

  it("returns the correct largest and smallest values for an array with duplicate numbers", () => {
    const result = findLargestAndSmallest([3, 5, 3, 7, 5]);
    expect(result.largest).toBe(7);
    expect(result.smallest).toBe(3);
  });
});
