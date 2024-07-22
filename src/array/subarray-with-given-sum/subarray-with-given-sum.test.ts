import { subarrayWithGivenSum } from "./subarray-with-given-sum";

describe("subarrayWithGivenSum", () => {
  it.each([
    { arr: [], target: 5, expected: [] },
    { arr: [5], target: 5, expected: [0] },
    { arr: [2, 3], target: 5, expected: [0, 1] },
    { arr: [2, 3], target: 6, expected: [] },
    { arr: [1, 2, 3, 7, 5], target: 12, expected: [1, 3] },
    { arr: [1, 4, 20, 3, 10, 5], target: 33, expected: [2, 4] },
  ])(
    "returns $expected for arr = $arr and target = $target",
    ({ arr, target, expected }) => {
      expect(subarrayWithGivenSum(arr, target)).toEqual(expected);
    }
  );
});
