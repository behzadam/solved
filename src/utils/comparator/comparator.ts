type CompareFunction<TData> = (a: TData, b: TData) => number;

export default class Comparator<TData = unknown> {
  compare: CompareFunction<TData>;

  constructor(customFunction?: CompareFunction<TData>) {
    this.compare = customFunction || this.defaultComparator;
  }

  /**
   * Default comparison function. It just assumes that "a" and "b" are numbers.
   * @param a - Just number for default comparison.
   * @param b - Just number for default comparison.
   * @returns number: 1 | -1 | 0
   */
  defaultComparator<TData>(a: TData, b: TData): number {
    if (typeof a !== "number" || typeof b !== "number")
      throw new Error(
        "Invalid arguments. Please, write your own compare function for this type."
      );

    if (a === b) return 0;
    // less than or greater than
    return a < b ? -1 : 1;
  }

  /**
   * Checks if two variables are equal.
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  equal(a: TData, b: TData): boolean {
    return this.compare(a, b) === 0;
  }

  /**
   * Checks if variable "a" is less than "b".
   * @param a
   * @param b
   * @returns
   */
  lessThan(a: TData, b: TData): boolean {
    return this.compare(a, b) < 0;
  }

  /**
   * Checks if variable "a" is greater than "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThan(a: TData, b: TData): boolean {
    return this.compare(a, b) > 0;
  }

  /**
   * Checks if variable "a" is less than or equal to "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  lessThanOrEqual(a: TData, b: TData): boolean {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  /**
   * Checks if variable "a" is greater than or equal to "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThanOrEqual(a: TData, b: TData): boolean {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  /**
   * Reverses the comparison order.
   */
  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a: TData, b: TData) => compareOriginal(b, a);
  }
}
