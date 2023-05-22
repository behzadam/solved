import { ComparatorFunction } from "./comparator-function.type";
import { ComparatorResult } from "./comparator-result.type";
import { ComparatorInterface } from "./comparator.type";

export default class Comparator<TType> implements ComparatorInterface<TType> {
  private _customComparator?: ComparatorFunction<TType>;

  constructor(comparator?: ComparatorFunction<TType>) {
    this._customComparator = comparator;
  }

  compare(left: TType, right: TType): ComparatorResult {
    if (this._customComparator) {
      return this._customComparator(left, right);
    }

    if (left === right) return 0;
    // less than or greater than
    return left < right ? -1 : 1;
  }

  /**
   * Checks if two variables are equal.
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  equal(a: TType, b: TType): boolean {
    return this.compare(a, b) === 0;
  }

  /**
   * Checks if variable "a" is less than "b".
   * @param a
   * @param b
   * @returns
   */
  lessThan(a: TType, b: TType): boolean {
    return this.compare(a, b) < 0;
  }

  /**
   * Checks if variable "a" is greater than "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThan(a: TType, b: TType): boolean {
    return this.compare(a, b) > 0;
  }

  /**
   * Checks if variable "a" is less than or equal to "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  lessThanOrEqual(a: TType, b: TType): boolean {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  /**
   * Checks if variable "a" is greater than or equal to "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThanOrEqual(a: TType, b: TType): boolean {
    return this.greaterThan(a, b) || this.equal(a, b);
  }
}
