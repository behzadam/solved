import { Comparator } from "@/comparator";
import binarySearch from "../binary-search";

describe("binarySearch", () => {
  it("searchs number in sorted array", () => {
    expect(binarySearch([] as number[], 1)).toBe(-1);
    expect(binarySearch([1], 1)).toBe(0);
    expect(binarySearch([1, 2], 1)).toBe(0);
    expect(binarySearch([1, 2], 2)).toBe(1);
    expect(binarySearch([1, 5, 10, 12], 1)).toBe(0);
    expect(binarySearch([1, 5, 10, 12, 14, 17, 22, 100], 17)).toBe(5);
    expect(binarySearch([1, 5, 10, 12, 14, 17, 22, 100], 1)).toBe(0);
    expect(binarySearch([1, 5, 10, 12, 14, 17, 22, 100], 100)).toBe(7);
    expect(binarySearch([1, 5, 10, 12, 14, 17, 22, 100], 0)).toBe(-1);
  });

  it("searchs object in sorted array", () => {
    type KeyValue = {
      key: number;
      value: string;
    };

    // Sorted array of objects based on key.
    const array: KeyValue[] = [
      { key: 1, value: "value1" },
      { key: 2, value: "value2" },
      { key: 3, value: "value3" },
    ];

    const comparator = Comparator.comparing((el: KeyValue) => el.key);

    expect(binarySearch([], { key: 1 } as KeyValue, comparator)).toBe(-1);
    expect(binarySearch(array, { key: 4 } as KeyValue, comparator)).toBe(-1);
    expect(binarySearch(array, { key: 1 } as KeyValue, comparator)).toBe(0);
    expect(binarySearch(array, { key: 2 } as KeyValue, comparator)).toBe(1);
    expect(binarySearch(array, { key: 3 } as KeyValue, comparator)).toBe(2);
  });
});
