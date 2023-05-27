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
   * Delete a node by value.
   * @param value
   * @returns deleted nod or null.
   */
  public delete(value: TValue) {
    if (!this.head) return null;

    let deletedNode = null;
    while (this.head && this._compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;
    if (currentNode) {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.next) {
        if (this._compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.tail && this._compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  /**
   * Deletes the linked list tail.
   * @returns deleted node or null;
   */
  deleteTail() {
    if (!this.tail) return null;

    const deletedTail = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedTail;
    }

    // If there are many nodes in linked list...

    // Rewind to the last node and delete "next" link for the node before the last one.
    let currentNode = this.head;
    while (currentNode?.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;
    return deletedTail;
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
