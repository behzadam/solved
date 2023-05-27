import HashTable from "../HashTable";

describe("HashTable", () => {
  it("creates hash table of certain size", () => {
    const defaultHashTable = new HashTable();
    expect(defaultHashTable.buckets.length).toBe(26);

    const biggerHashTable = new HashTable(64);
    expect(biggerHashTable.buckets.length).toBe(64);
  });

  it("generates proper hash for specified keys", () => {
    const hashTable = new HashTable();

    expect(hashTable.hash("a")).toBe(1);
    expect(hashTable.hash("b")).toBe(2);
    expect(hashTable.hash("abc")).toBe(6);
  });
});
