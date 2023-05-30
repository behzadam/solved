export type ComparatorFunction<TItem> = (
  left: TItem,
  right: TItem
) => number | 1 | -1 | 0;
