import LinkedList from "@/linked-list/linked-list";

type Pair<TValue> = {
  key: string | null;
  value: TValue | null;
};
const defaultHashTableSize = 32;
export default class HashTable<TValue = unknown> {
  public buckets: Array<LinkedList<Pair<TValue>>>;

  constructor(size = defaultHashTableSize) {
    this.buckets = new Array(size)
      .fill({ key: null, value: null } as Pair<TValue>)
      .map(() => new LinkedList<Pair<TValue>>());
  }

  hash(key: string) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.buckets.length;
  }

  set(key: string, value: TValue) {
    const keyHash = this.hash(key);
    const node = this.buckets[keyHash].find({
      condition: (nodeValue) => nodeValue?.key === key,
    });

    if (!node) {
      // Insert new node.
      this.buckets[keyHash].append({ key, value });
    } else {
      // Update value of existing node.
      node.value.value = value;
    }
  }
}
