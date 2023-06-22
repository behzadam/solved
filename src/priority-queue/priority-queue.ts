import Comparator from "@/comparator/comparator";
import MinHeap from "../heap/min-heap";

export default class PriorityQueue<Item> extends MinHeap<Item> {
  private _priorities: Map<Item, number>;

  constructor() {
    super();
    this._priorities = new Map();
    this.compare = new Comparator(this.comparePriority.bind(this));
  }

  /**
   * Adds item to the priority queue.
   * @param item
   * @param priority
   * @returns
   */
  add(item: Item, priority = 0): PriorityQueue<Item> {
    this._priorities.set(item, priority);
    super.add(item);
    return this;
  }

  /**
   * Remove item from priority queue.
   * @param {*} item - item we're going to remove.
   * @param {Comparator} [customFindingComparator] - custom function for finding the item to remove
   * @return {PriorityQueue}
   */
  remove(item: Item, comparator?: Comparator<Item>): PriorityQueue<Item> {
    super.remove(item, comparator);
    this._priorities.delete(item);
    return this;
  }

  /**
   * Change priority of the item in a queue.
   * @param {*} item - item we're going to re-prioritize.
   * @param {number} priority - new item's priority.
   * @return {PriorityQueue}
   */
  changePriority(item: Item, priority: number): PriorityQueue<Item> {
    this.remove(item, new Comparator(this.compareValue));
    this.add(item, priority);
    return this;
  }

  /**
   * Find item by ite value.
   * @param {*} item
   * @return {Number[]}
   */
  findByValue(item: Item): number[] {
    return this.find(item, new Comparator(this.compareValue));
  }

  /**
   * Check if item already exists in a queue.
   * @param {*} item
   * @return {boolean}
   */
  hasValue(item: Item): boolean {
    return this.findByValue(item).length > 0;
  }

  /**
   * Compares priorities of two items.
   * @param {*} a
   * @param {*} b
   * @return {number}
   */
  comparePriority(a: Item, b: Item): number {
    if (this._priorities.get(a) === this._priorities.get(b)) {
      return 0;
    }
    return this._priorities.get(a)! < this._priorities.get(b)! ? -1 : 1;
  }

  /**
   * Compares values of two items.
   * @param {*} a
   * @param {*} b
   * @return {number}
   */
  compareValue(a: any, b: any): number {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }
}
