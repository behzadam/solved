import { Nullable } from "./nullable";

export type Pair<TValue> = {
  key: Nullable<string>;
  value: Nullable<TValue>;
};
