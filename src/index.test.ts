import {
  BinarySearch,
  Comparator,
  HashTable,
  LinearSearch,
  LinkedList,
  LinkedListNode,
  MaxHeap,
  MaxPriorityQueue,
  MinHeap,
  MinPriorityQueue,
  Queue,
  Stack,
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
    [BinarySearch.name],
    [LinearSearch.name],
    [MaxPriorityQueue.name],
    [MinPriorityQueue.name],
    [Stack.name],
    [Queue.name],
    [Comparator.name],
  ])("imports %s", (expected) => {
    expect(expected).not.toBeNull();
  });
});
