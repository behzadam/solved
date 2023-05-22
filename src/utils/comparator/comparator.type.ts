import { ComparatorResult } from "./comparator-result.type";

/*
 ** Returns a negative value if left is less than right.
 ** Returns zero if left is equal to right.
 ** Returns a positive value if left is greater than right.
 */
export interface ComparatorInterface<TType> {
  compare(left: TType, right: TType): ComparatorResult;
}
