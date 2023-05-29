import {
  HashTable,
  LinkedList,
  LinkedListNode,
  MaxHeap,
  MinHeap,
  Trie,
  TrieNode,
} from "./";

describe("Export Modules", () => {
  test.each([
    [MinHeap.name],
    [MaxHeap.name],
    [HashTable.name],
    [LinkedList.name],
    [LinkedListNode.name],
    [Trie.name],
    [TrieNode.name],
  ])("imports %s", (expected) => {
    expect(expected).not.toBeNull();
  });
});
