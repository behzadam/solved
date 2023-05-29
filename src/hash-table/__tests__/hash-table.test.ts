import { Pair } from "@/types/pair";
import HashTable from "../hash-table";

const defaultHashTableSize = 32;
describe("HashTable", () => {
  it("creates hash table of certain size", () => {
    const defaultHashTable = new HashTable();
    expect(defaultHashTable.buckets.length).toBe(defaultHashTableSize);

    const biggerHashTable = new HashTable(64);
    expect(biggerHashTable.buckets.length).toBe(64);
  });

  it("deletes data with collisions", () => {
    const hashTable = new HashTable<string>(3);

    hashTable.set("a", "sky-old");
    hashTable.set("a", "sky");
    hashTable.set("b", "sea");
    hashTable.set("c", "earth");
    hashTable.set("d", "ocean");

    expect(hashTable.has("x")).toBe(false);
    expect(hashTable.has("b")).toBe(true);
    expect(hashTable.has("c")).toBe(true);

    const stringifier = (value: Pair<string>) => `${value.key}:${value.value}`;

    expect(hashTable.buckets[0].toString(stringifier)).toBe("c:earth");
    expect(hashTable.buckets[1].toString(stringifier)).toBe("a:sky,d:ocean");
    expect(hashTable.buckets[2].toString(stringifier)).toBe("b:sea");

    expect(hashTable.get("a")).toBe("sky");
    expect(hashTable.get("d")).toBe("ocean");
    expect(hashTable.get("x")).not.toBeDefined();

    hashTable.delete("a");

    expect(hashTable.delete("not-existing")).toBeNull();

    expect(hashTable.get("a")).not.toBeDefined();
    expect(hashTable.get("d")).toBe("ocean");

    hashTable.set("d", "ocean-new");
    expect(hashTable.get("d")).toBe("ocean-new");
  });

  it("adds objects to hash table", () => {
    type Product = {
      id: string;
      title: string;
    };
    const hashTable = new HashTable<Product>();
    hashTable.set("product", { id: "1", title: "Product A" } as Product);

    const object = hashTable.get("product");
    expect(object).toBeDefined();
    expect(object?.id).toBe("1");
    expect(object?.title).toBe("Product A");
  });

  it("should tracks actual keys", () => {
    const hashTable = new HashTable<string>(3);

    hashTable.set("a", "sky-old");
    hashTable.set("a", "sky");
    hashTable.set("b", "sea");
    hashTable.set("c", "earth");
    hashTable.set("d", "ocean");

    expect(hashTable.getKeys()).toEqual(["a", "b", "c", "d"]);
    expect(hashTable.has("a")).toBe(true);
    expect(hashTable.has("x")).toBe(false);

    hashTable.delete("a");

    expect(hashTable.has("a")).toBe(false);
    expect(hashTable.has("b")).toBe(true);
    expect(hashTable.has("x")).toBe(false);
  });

  it("gets all the values", () => {
    const hashTable = new HashTable<string>(3);

    expect(hashTable.getValues()).toEqual([]);

    hashTable.set("a", "alpha");
    hashTable.set("b", "beta");
    hashTable.set("c", "gamma");

    expect(hashTable.getValues()).toEqual(["gamma", "alpha", "beta"]);
  });

  it("gets all the values in case of hash collision", () => {
    const hashTable = new HashTable<string>(3);

    // Keys `ab` and `ba` in current implementation should result in one hash (one bucket).
    // We need to make sure that several items from one bucket will be serialized.
    hashTable.set("ab", "one");
    hashTable.set("ba", "two");

    hashTable.set("ac", "three");

    expect(hashTable.getValues()).toEqual(["one", "two", "three"]);
  });
});
