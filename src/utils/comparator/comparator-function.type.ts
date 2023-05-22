import { ComparatorResult } from "./comparator-result.type";

export type ComparatorFunction<TType> = (
  left: TType,
  right: TType
) => ComparatorResult;
