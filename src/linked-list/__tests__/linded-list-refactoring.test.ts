import { Comparator } from "@/comparator";
import LinkedList from "../linked-list-refactoring";

describe("LinkedList Refactored", () => {
  it("creates an empty linked list", () => {
    const linkedList = new LinkedList();

    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();

    expect(linkedList.toArray()).toStrictEqual([]);
    expect(linkedList.toString()).toBe("");
  });

  it("appends to the linked list", () => {
    const linkedList = new LinkedList<number>();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    expect(linkedList.toString()).toBe("1,2,3");
    expect(linkedList.tail?.next).toBeNull();
  });

  it("finds node by primitive value", () => {
    const stringComparator = Comparator.comparing((a: string) => a.length);
    const linkedList = new LinkedList<string>(stringComparator);

    linkedList.append("one");
    linkedList.append("two");
    linkedList.append("three");

    const node = linkedList.find({ value: "one" });

    expect(node).toBeDefined();
    expect(node?.value).toBe("one");

    const withCallback = linkedList.find({
      filter: (a: string) => a.startsWith("t", 0),
    });

    expect(withCallback).toBeDefined();
    expect(withCallback?.value).toBe("two");

    const notFound = linkedList.find({ value: "four" });
    expect(notFound).toBeNull();
  });
});
