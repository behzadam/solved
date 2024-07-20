import { nonConstructibleChange } from "./non-constructible-change";

describe("nonConstructibleChange", () => {
  test.each([{ coins: [5, 7, 1, 1, 2, 3, 22], expected: 20 }])(
    "returns $expected when conis are $coins",
    ({ coins, expected }) => {
      const actual = nonConstructibleChange(coins);
      expect(actual).toBe(expected);
    }
  );
});
