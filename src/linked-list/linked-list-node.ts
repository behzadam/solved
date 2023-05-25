import { Nullable } from "@/types";

export default class LinkedListNode<TValue> {
  public value: TValue;
  public next: Nullable<LinkedListNode<TValue>>;

  constructor(value: TValue, next: Nullable<LinkedListNode<TValue>> = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback?: (value: TValue) => string) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
