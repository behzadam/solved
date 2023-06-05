import LinkedList from "@/linked-list/linked-list";
import { Pair } from "@/types/pair";

export default class HashTable<Value> {
  private buckets: LinkedList<Pair<Value>>[];

  constructor(size = 7) {
    this.buckets = new Array<LinkedList<Pair<Value>>>(size).fill(
      new LinkedList<Pair<Value>>()
    );
  }

  private hash(key: string) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * 23) % this.buckets.length;
    }
    return hash;
  }

  public set(key: string, value: Value) {
    const index = this.hash(key);
    const bucketLinkedList = this.buckets[index];

    // Check if the bucket has already an item with this key.
    const node = bucketLinkedList.find({ filter: (item) => item.key === key });
    if (!node) {
      // Insert new node.
      bucketLinkedList.append({ key, value });
    } else {
      // Update current node.
      node.value = value;
    }

    return this;
  }

  public size(): number {
    return this.buckets.length;
  }
}
