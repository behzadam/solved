import Comparator from "./comparator";

describe("Comparator", () => {
  it("compares with default comparator function", () => {
    const comparator = new Comparator();

    // equal
    expect(comparator.equal(0, 0)).toBe(true);
    expect(comparator.equal(0, 1)).toBe(false);
    // less than
    expect(comparator.lessThan(1, 2)).toBe(true);
    expect(comparator.lessThan(-1, 2)).toBe(true);
    expect(comparator.lessThan(10, 2)).toBe(false);
    // less than or equal
    expect(comparator.lessThanOrEqual(10, 2)).toBe(false);
    expect(comparator.lessThanOrEqual(1, 1)).toBe(true);
    expect(comparator.lessThanOrEqual(0, 0)).toBe(true);
    // greater than
    expect(comparator.greaterThan(0, 0)).toBe(false);
    expect(comparator.greaterThan(10, 0)).toBe(true);

    // greater than or equal
    expect(comparator.greaterThanOrEqual(10, 0)).toBe(true);
    expect(comparator.greaterThanOrEqual(10, 10)).toBe(true);
    expect(comparator.greaterThanOrEqual(0, 10)).toBe(false);
  });

  it("compares with custom comparator function", () => {
    const comparator = new Comparator((a: string, b: string) => {
      if (a.length === b.length) {
        return 0;
      }

      return a.length < b.length ? -1 : 1;
    });

    expect(comparator.equal("a", "b")).toBe(true);
    expect(comparator.equal("a", "")).toBe(false);
    expect(comparator.lessThan("b", "aa")).toBe(true);
    expect(comparator.greaterThanOrEqual("a", "aa")).toBe(false);
    expect(comparator.greaterThanOrEqual("aa", "a")).toBe(true);
    expect(comparator.greaterThanOrEqual("a", "a")).toBe(true);
  });

  it("compares objects with custom comparator function", () => {
    type Product = {
      rate: number;
    };
    const products: Product[] = [
      {
        rate: 1,
      },
      {
        rate: 2,
      },
      {
        rate: 3,
      },
    ];

    const comparator = new Comparator((a: Product, b: Product) => {
      if (a.rate === b.rate) {
        return 0;
      }

      return a.rate < b.rate ? -1 : 1;
    });

    expect(comparator.greaterThanOrEqual(products[0], products[1])).toBe(false);
  });
});
