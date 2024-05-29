import { findMaxSubarray } from "./find-max-subarray";

describe("findMaxSubarray", () => {
  it("returns sum of the given array with the given start and end indices", () => {
    const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    const maxSubarray = findMaxSubarray(arr);
    expect(findMaxSubarray(arr)).toEqual(maxSubarray);
  });
});
