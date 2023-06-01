import LinkedList from "@/linked-list/linked-list";
import LinkedListNode from "@/linked-list/linked-list-node";
import { Nullable } from "@/types";
import { Pair } from "@/types/pair";

const defaultHashTableSize = 32;
export default class HashTable<Element = unknown> {
  private _keys: Record<string, number>;
  public buckets: LinkedList<Pair<Element>>[];

  constructor(size = defaultHashTableSize) {
    this._keys = {};
    this.buckets = Array(size)
      .fill(null)
      .map(() => new LinkedList());
  }

  private hash(key: string) {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
      0
    );

    // Reduce hash number so it would fit hash table size.
    return hash % this.buckets.length;
  }

  set(key: string, value: Element): void {
    const keyHash = this.hash(key);
    this._keys[key] = keyHash;
    const bucket = this.buckets[keyHash];
    const node = bucket.find({
      condition: (nodeValue) => nodeValue.key === key,
    });

    if (!node) {
      // Insert new node.
      bucket.append({ key, value });
    } else {
      // Update value of existing node.
      node.value.value = value;
    }
  }

  /**
   *
   * @param key
   * @returns deleted nod or null.
   */
  delete(key: string): Nullable<LinkedListNode<Pair<Element>>> {
    const keyHash = this.hash(key);
    delete this._keys[key];
    const bucket = this.buckets[keyHash];
    const node = bucket.find({
      condition: (nodeValue) => nodeValue?.key === key,
    });

    if (node) {
      return bucket.delete(node.value);
    }

    return null;
  }

  /**
   * Checks if key exists in bucket.
   * @param key
   * @returns true or false.
   */
  has(key: string): boolean {
    return key in this._keys;
  }

  /**
   * Returns value of key in bucket.
   * @param key
   * @returns value or null.
   */
  get(key: string): Nullable<Element> {
    const bucket = this.buckets[this.hash(key)];
    const node = bucket.find({
      condition: (nodeValue) => nodeValue.key === key,
    });
    return node ? node.value.value : undefined;
  }

  /**
   * Returns all the keys.
   * @returns array of keys.
   */
  getKeys(): string[] {
    return Object.keys(this._keys);
  }

  /**
   * Returns all hash table values.
   * @returns array of values.
   */
  getValues(): Element[] {
    return this.buckets.reduce(
      (values: Element[], bucket: LinkedList<Pair<Element>>) => {
        const bucketValues = bucket
          .toArray()
          .map((linkedListNode) => linkedListNode.value.value);
        return values.concat(bucketValues as Element[]);
      },
      [] as Element[]
    );
  }
}
