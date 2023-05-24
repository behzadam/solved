/**
 * Returns a negative value if left is less than right.
 * Returns zero if left is equal to right.
 * Returns a positive value if left is greater than right.
 */
export type ComparableResult = 1 | -1 | 0;
export type ComparableFunc<TType> = (
  left: TType,
  right: TType
) => ComparableResult;

export interface Comparable<TType> {
  compare: ComparableFunc<TType>;
}
