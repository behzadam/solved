import { ComparableFunc, Nullable } from "@/types";
import Comparator from "@/utils/comparator";
import LinkedListNode from "./linked-list-node";

export default class LinkedList<TValue> {
  public head: Nullable<LinkedListNode<TValue>>;
  public tail: Nullable<LinkedListNode<TValue>>;
  private _compare: Comparator<TValue>;

  constructor(comparator?: ComparableFunc<TValue>) {
    this.head = null;
    this.tail = null;
    this._compare = new Comparator(comparator);
  }

  /**
   * Adds a node to the beginning of the list.
   * @param value
   * @returns
   */
  public prepend(value: TValue) {
    const newNode = new LinkedListNode<TValue>(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }
    return this;
  }

  /**
   * Adds a node to the end of the list.
   * @param value
   * @returns
   */
  public append(value: TValue) {
    const newNode = new LinkedListNode(value);

    if (!this.head || !this.tail) {
      // initializing
      this.head = newNode;
      this.tail = this.head;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  /**
   * Generates an array of nodes.
   * @returns array of nodes.
   */
  toArray() {
    const nodes: Array<LinkedListNode<TValue>> = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  toString(callback?: (value: TValue) => string) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }
}
