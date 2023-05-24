import {
  Comparable,
  ComparableFunc,
  ComparableResult,
} from "@/types/comparable";

export default class Comparator<TType> implements Comparable<TType> {
  private _customComparator?: ComparableFunc<TType>;

  constructor(comparator?: ComparableFunc<TType>) {
    this._customComparator = comparator;
  }

  /**
   * Returns a negative value if left is less than right.
   * Returns zero if left is equal to right.
   * Returns a positive value if left is greater than right.
   */
  compare(left: TType, right: TType): ComparableResult {
    // checks if a custom comparator passed then run it for first.
    if (this._customComparator) {
      return this._customComparator(left, right);
    }

    if (left === right) return 0;
    // less than or greater than
    return left < right ? -1 : 1;
  }

  /**
   * Checks if left and right are equal.
   * @param left
   * @param right
   * @returns true if the variables are equal.
   */
  equal(left: TType, right: TType): boolean {
    return this.compare(left, right) === 0;
  }

  /**
   * Checks if left is less than right.
   * @param left
   * @param right
   * @returns true if the left is less than the right.
   */
  lessThan(left: TType, right: TType): boolean {
    return this.compare(left, right) < 0;
  }

  /**
   * Checks if left is greater than right.
   * @param left
   * @param right
   * @returns true if the left is greater than the right.
   */
  greaterThan(left: TType, right: TType): boolean {
    return this.compare(left, right) > 0;
  }

  /**
   * Checks if left is less than or equal to right.
   * @param left
   * @param right
   * @returns true if left is less than or equal right.
   */
  lessThanOrEqual(left: TType, right: TType): boolean {
    return this.lessThan(left, right) || this.equal(left, right);
  }

  /**
   * Checks if left is greater than or equal to right.
   * @param left
   * @param right
   * @returns true if left is greater than or equal right.
   */
  greaterThanOrEqual(left: TType, right: TType): boolean {
    return this.greaterThan(left, right) || this.equal(left, right);
  }
}
