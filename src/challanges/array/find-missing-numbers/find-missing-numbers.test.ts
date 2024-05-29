import { findMissingNumbers } from "./find-missing-numbers";

describe("findMissingNumbers", () => {
  it.each`
    input        | expected
    ${[]}        | ${[]}
    ${[1, 2, 8]} | ${[3, 4, 5, 6, 7]}
  `("returns $expected when input is: $input", ({ input, expected }) => {
    expect(findMissingNumbers(input)).toStrictEqual(expected);
  });
});
