import { findMajorityElement } from "./find-majority-element";

describe("findMajorityElement", () => {
  it("returns the majority element when it exists", () => {
    expect(findMajorityElement([3, 2, 3])).toBe(3);
    expect(findMajorityElement([2, 2, 1, 1, 1, 2, 2])).toBe(2);
  });

  it("handles array with a single element", () => {
    expect(findMajorityElement([1])).toBe(1);
  });

  it("handles array with all elements being the same", () => {
    expect(findMajorityElement([1, 1, 1, 1])).toBe(1);
  });
});
