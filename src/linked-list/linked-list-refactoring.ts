import Comparator from "@/comparator/comparator";
import { ComparatorFunction } from "@/comparator/comparator-function";
import { Nullable } from "@/types";
import LinkedListNode from "./linked-list-node";

// Finding a node by value or filter condition.
// Make sure that at least argument is required.
type FindOptions<Value> = Partial<
  Required<{ value: Value; filter: (value: Value) => boolean }>
>;

export default class LinkedList<Value> {
  public head: Nullable<LinkedListNode<Value>>;
  public tail: Nullable<LinkedListNode<Value>>;

  private _compare: Comparator<Value>;

  constructor(comparator?: ComparatorFunction<Value>) {
    this.head = null;
    this.tail = this.head;
    this._compare = new Comparator(comparator);
  }

  /**
   * Traverse the linked list and yield items.
   * @returns Generator<LinkedListNode<Value>, void, unknown>
   */
  private *traverse() {
    let currentNode = this.head;
    while (currentNode) {
      yield currentNode;
      currentNode = currentNode.next;
    }
  }

  /**
   * Adds a node to the end of the list.
   * @param value
   * @returns this
   */
  public append(value: Value): LinkedList<Value> {
    const newNode = new LinkedListNode(value);

    if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }

    return this;
  }

  /**
   * Adds a node to the beginning of the list.
   * @param value
   * @returns this
   */
  public prepend(value: Value): LinkedList<Value> {
    const newNode = new LinkedListNode<Value>(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    return this;
  }

  /**
   * Removes a node from the end of the list.
   * @returns - removed node or undefined.
   */
  public pop(): Nullable<LinkedListNode<Value>> {
    if (!this.head) return undefined;

    let current = this.head;
    let temp = this.head;
    while (current.next) {
      temp = current;
      current = current.next;
    }
    this.tail = temp;
    this.tail.next = null;

    if (this.size() === 0) {
      this.head = null;
      this.tail = null;
    }

    return current;
  }

  /**
   * Removes a node from the head of the list.
   * @returns - removed node or undefined.
   */
  public shift(): Nullable<LinkedListNode<Value>> {
    if (!this.head) return undefined;

    const current = this.head;
    this.head = this.head.next;
    current.next = null;
    if (this.size() === 0) {
      this.tail = null;
    }

    return current;
  }

  /**
   * Searchs in the list by
   * @param value - to search.
   * @param filter - is a callback function that if is passed then compare function would be ignore.
   * @returns the first node that matched or null.
   */
  public find({ value, filter }: FindOptions<Value>): Nullable<LinkedListNode> {
    for (const node of this.traverse()) {
      if (filter && filter(node.value)) return node;
      if (value && this._compare.equal(node.value, value)) return node;
    }
    return null;
  }

  /**
   * Generates an array of nodes.
   * @returns array of nodes.
   */
  public toArray(): LinkedListNode<Value>[] {
    return Array.from(this.traverse());
  }

  /**
   * Returns the lenght of the list.
   * @returns - 0 or lenght.
   */
  public size(): number {
    return this.toArray().length;
  }

  /**
   * Invokes an optional callback function for each node and returns comma separated string.
   * @param callback - Optional callback function
   * @returns string
   */
  public toString(callback?: (value: Value) => string): string {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }
}
