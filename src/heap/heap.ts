import { Nullable } from "@/types";
import Comparator, { ComparatorFunction } from "@/utils/comparator";

export default abstract class Heap<TType> {
  protected heap: TType[];
  protected compare: Comparator<TType>;

  constructor(comparator?: ComparatorFunction<TType>) {
    this.heap = [];
    this.compare = new Comparator(comparator);
  }

  protected getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  protected getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  protected getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  protected hasParent(childIndex: number): boolean {
    return this.getParentIndex(childIndex) >= 0;
  }

  protected hasLeftChild(parentIndex: number): boolean {
    return this.getLeftChildIndex(parentIndex) < this.heap.length;
  }

  protected hasRightChild(parentIndex: number): boolean {
    return this.getRightChildIndex(parentIndex) < this.heap.length;
  }

  protected leftChild(parentIndex: number): TType {
    return this.heap[this.getLeftChildIndex(parentIndex)];
  }

  protected rightChild(parentIndex: number): TType {
    return this.heap[this.getRightChildIndex(parentIndex)];
  }

  protected parent(childIndex: number): TType {
    return this.heap[this.getParentIndex(childIndex)];
  }

  protected swap(indexOne: number, indexTwo: number): void {
    const tmp = this.heap[indexTwo];
    this.heap[indexTwo] = this.heap[indexOne];
    this.heap[indexOne] = tmp;
  }

  protected heapifyUp(startIndex?: number) {
    // Take the last element (last in array or the bottom left in a tree)
    // in the heap container and lift it up until it is in the correct
    // order with respect to its parent element.
    let currentIndex = startIndex || this.size() - 1;

    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(
        this.parent(currentIndex),
        this.heap[currentIndex]
      )
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  protected heapifyDown(startIndex = 0): void {
    // Compare the parent element to its children and swap parent with the appropriate
    // child (smallest child for MinHeap, largest child for MaxHeap).
    // Do the same for next children after swap.
    let currentIndex = startIndex;
    let nextIndex = -1;

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsInCorrectOrder(
          this.rightChild(currentIndex),
          this.leftChild(currentIndex)
        )
      ) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      if (
        this.pairIsInCorrectOrder(this.heap[currentIndex], this.heap[nextIndex])
      ) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  protected pairIsInCorrectOrder(
    firstElement: TType,
    secondElement: TType
  ): boolean {
    throw new Error(`
      You have to implement heap pair comparision method
      for ${firstElement} and ${secondElement} values.
      `);
  }

  find(item: TType, comparator = this.compare): number[] {
    const foundItemIndices: number[] = [];
    for (let itemIndex = 0; itemIndex < this.size(); itemIndex += 1) {
      if (comparator.equal(item, this.heap[itemIndex])) {
        foundItemIndices.push(itemIndex);
      }
    }
    return foundItemIndices;
  }

  add(item: TType): Heap<TType> {
    this.heap.push(item);
    this.heapifyUp();
    return this;
  }

  peek(): Nullable<TType> {
    if (this.size() === 0) return null;
    return this.heap[0];
  }

  poll(): Nullable<TType> {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const item = this.heap[0];
    // Move the last element from the end to the head.
    this.heap[0] = this.heap.pop() as TType;
    this.heapifyDown();

    return item;
  }

  remove(item: TType, comparator = this.compare): Heap<TType> {
    // Find number of items to remove.
    const numberOfItemsToRemove = this.find(item, comparator).length;

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
      // We need to find item index to remove each time after removal since
      // indices are being changed after each heapify process.
      const indexToRemove = this.find(item, comparator).pop() as number;

      // If we need to remove last child in the heap then just remove it.
      // There is no need to heapify the heap afterwards.
      if (indexToRemove === this.size() - 1) {
        this.heap.pop();
      } else {
        // Move last element in heap to the vacant (removed) position.
        this.heap[indexToRemove] = this.heap.pop() as TType;
        // Get parent.
        const parentItem = this.parent(indexToRemove);
        // If there is no parent or parent is in correct order with the node
        // we're going to delete then heapify down. Otherwise heapify up.
        if (
          this.hasLeftChild(indexToRemove) &&
          (!parentItem ||
            this.pairIsInCorrectOrder(parentItem, this.heap[indexToRemove]))
        ) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  size(): number {
    return this.heap.length;
  }

  toString() {
    return this.heap.toString();
  }
}
