import Comparator from "@/comparator/comparator";
import MinHeap from "../heap/min-heap";

export default class PriorityQueue<Item> extends MinHeap<Item> {
  private queue: Map<Item, number>;

  constructor() {
    super();
    this.queue = new Map();
    this.compare = new Comparator(this.internalComparator.bind(this));
  }

  private internalComparator(a: Item, b: Item): number {
    if (this.queue.get(a) === this.queue.get(b)) {
      return 0;
    }
    return this.queue.get(a)! < this.queue.get(b)! ? -1 : 1;
  }

  /**
   * Adds item to the priority queue.
   * @param item - item to add.
   * @param priority - item priority.
   * @returns this.
   */
  add(item: Item, priority = 0): PriorityQueue<Item> {
    this.queue.set(item, priority);
    super.add(item);
    return this;
  }

  /**
   * Removes item from priority queue.
   * @param item - item to remove.
   * @param comparator - optional custom comparator.
   * @returns - this.
   */
  remove(item: Item, comparator?: Comparator<Item>): PriorityQueue<Item> {
    super.remove(item, comparator);
    this.queue.delete(item);
    return this;
  }

  /**
   * Changes the priority of an item in the queue.
   * @param item - item to re-prioritize.
   * @param priority - new item's priority.
   * @returns - this.
   */
  changePriority(item: Item, priority: number): PriorityQueue<Item> {
    this.remove(item, new Comparator(Comparator.naturalOrder()));
    this.add(item, priority);
    return this;
  }

  /**
   * Finds items in the queue and returns the indices.
   * @param item
   * @returns array of indices.
   */
  findByValue(item: Item): number[] {
    return this.find(item, new Comparator(Comparator.naturalOrder()));
  }

  /**
   * Checks if a given item already exists in the queue.
   * @param item - the given item to check.
   * @returns - true if the item exists, false if is not exists.
   */
  isExists(item: Item): boolean {
    return this.findByValue(item).length > 0;
  }
}
