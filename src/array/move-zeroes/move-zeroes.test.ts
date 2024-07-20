import { moveZeroes } from "./move-zeroes";

describe("moveZeroes", () => {
  it("should move all zeroes to the end of the array", () => {
    const input = [0, 1, 0, 3, 12];
    const expected = [1, 3, 12, 0, 0];
    expect(moveZeroes(input)).toEqual(expected);
  });

  it("handles an array with all zeroes", () => {
    const input = [0, 0, 0];
    const expected = [0, 0, 0];
    expect(moveZeroes(input)).toEqual(expected);
  });

  it("handles an array with no zeroes", () => {
    const input = [1, 2, 3];
    const expected = [1, 2, 3];
    expect(moveZeroes(input)).toEqual(expected);
  });

  it("handles an empty array", () => {
    const input = [] as number[];
    const expected = [] as number[];
    expect(moveZeroes(input)).toEqual(expected);
  });
});
