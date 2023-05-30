/**
 * Returns a negative value if left is less than right.
 * Returns zero if left is equal to right.
 * Returns a positive value if left is greater than right.
 */
export interface Comparable<TItem> {
  compare(left: TItem, right: TItem): number | 1 | -1 | 0;
}
