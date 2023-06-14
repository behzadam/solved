import { Comparator, ComparatorFunction } from "@/comparator";

/**
 * Linear search.
 * @param array - Given an array.
 * @param seekElement - The element to search.
 * @param comparatorFunction - Optional comparator function.
 * @returns array of numbers or an empty array.
 */
export default function linearSearch<Element>(
  array: Element[],
  seekElement: Element,
  comparatorFunction?: ComparatorFunction<Element>
): number[] {
  const comparator = new Comparator(comparatorFunction);
  const foundIndices = [] as number[];

  array.forEach((element, index) => {
    if (comparator.equal(element, seekElement)) {
      foundIndices.push(index);
    }
  });

  return foundIndices;
}
