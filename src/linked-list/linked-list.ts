import { ComparableFunc, Nullable } from "@/types";
import Comparator from "@/utils/comparator";
import { isDefined } from "@/utils/is-defined";
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
   * Function generator that returns nodes.
   */
  private *nodes(): Generator<LinkedListNode<TValue>, void, unknown> {
    let currentNode = this.head;
    while (currentNode) {
      yield currentNode;
      currentNode = currentNode.next;
    }
  }

  /**
   * Adds a node to the beginning of the list.
   * @param value
   * @returns this
   */
  public prepend(value: TValue): LinkedList<TValue> {
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
   * @returns this
   */
  public append(value: TValue): LinkedList<TValue> {
    const newNode = new LinkedListNode(value);

    if (!this.head || !this.tail) {
      // initializing
      this.head = newNode;
      this.tail = newNode;
    }

    // change the current tail next reference to the new node.
    this.tail.next = newNode;
    // now the new node is current tail.
    this.tail = newNode;
    // change the current tail next to null to avoid circle reference.
    this.tail.next = null;

    return this;
  }

  /**
   * Delete a node by value.
   * @param value
   * @returns deleted nod or null.
   */
  public delete(value: TValue): Nullable<LinkedListNode<TValue>> {
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
  public deleteTail(): Nullable<LinkedListNode<TValue>> {
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
   * Deletes the linked list head.
   * @returns deleted node or null;
   */
  public deleteHead(): Nullable<LinkedListNode<TValue>> {
    if (!this.head) return null;

    const deletedHead = this.head;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    return deletedHead;
  }

  /**
   * Finds a node value and comparator or custom compare function.
   * @param value value to find.
   * @param callback optional function that returns true or false.
   * @returns node or null.
   */
  public find(
    value: TValue,
    callback?: (value: TValue) => boolean
  ): Nullable<LinkedListNode<TValue>> {
    if (!this.head) return null;

    let currentNode: Nullable<LinkedListNode<TValue>> = this.head;
    while (currentNode) {
      // If callback is specified then try to find node by callback.
      if (isDefined(callback) && callback(currentNode.value)) {
        return currentNode;
      }
      // If value is specified then try to compare by value.
      if (isDefined(value) && this._compare.equal(currentNode.value, value)) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * Creates a linked list by an array.
   * @param values
   * @returns this
   */
  public fromArray(values: TValue[]): LinkedList<TValue> {
    values.forEach((value) => this.append(value));
    return this;
  }

  /**
   * Generates an array of nodes.
   * @returns array of nodes.
   */
  public toArray(): LinkedListNode<TValue>[] {
    return Array.from(this.nodes());
  }

  /**
   * Invokes an optional callback function for each node and returns comma separated string.
   * @param callback - Optional callback function
   * @returns string
   */
  public toString(callback?: (value: TValue) => string): string {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }
}
