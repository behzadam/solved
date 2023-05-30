import { Comparable } from "@/comparator/comparable";
import { ComparatorFunction } from "./comparator-function";

export default class Comparator<TItem> implements Comparable<TItem> {
  private _customComparator?: ComparatorFunction<TItem>;

  constructor(comparator?: ComparatorFunction<TItem>) {
    this._customComparator = comparator;
  }

  /**
   * Returns a negative value if left is less than right.
   * Returns zero if left is equal to right.
   * Returns a positive value if left is greater than right.
   */
  public compare(left: TItem, right: TItem): number {
    // checks if a custom comparator passed then run it for first.
    if (this._customComparator) {
      return this._customComparator(left, right);
    }

    if (left === right) return 0;
    return left < right ? -1 : 1;
  }

  /**
   * Checks if left and right are equal.
   * @param left
   * @param right
   * @returns true if the variables are equal.
   */
  public equal(left: TItem, right: TItem): boolean {
    return this.compare(left, right) === 0;
  }

  /**
   * Checks if left is less than right.
   * @param left
   * @param right
   * @returns true if the left is less than the right.
   */
  public lessThan(left: TItem, right: TItem): boolean {
    return this.compare(left, right) < 0;
  }

  /**
   * Checks if left is greater than right.
   * @param left
   * @param right
   * @returns true if the left is greater than the right.
   */
  public greaterThan(left: TItem, right: TItem): boolean {
    return this.compare(left, right) > 0;
  }

  /**
   * Checks if left is less than or equal to right.
   * @param left
   * @param right
   * @returns true if left is less than or equal right.
   */
  public lessThanOrEqual(left: TItem, right: TItem): boolean {
    return this.lessThan(left, right) || this.equal(left, right);
  }

  /**
   * Checks if left is greater than or equal to right.
   * @param left
   * @param right
   * @returns true if left is greater than or equal right.
   */
  public greaterThanOrEqual(left: TItem, right: TItem): boolean {
    return this.greaterThan(left, right) || this.equal(left, right);
  }
}
