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

  it("prepends to the linked list", () => {
    const linkedList = new LinkedList<number>();

    linkedList.prepend(2);
    expect(linkedList.head?.toString()).toBe("2");
    expect(linkedList.tail?.toString()).toBe("2");

    linkedList.append(1);
    linkedList.prepend(3);

    expect(linkedList.toString()).toBe("3,2,1");
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

  it("gets node by index", () => {
    const linkedList = new LinkedList<string>();

    linkedList.append("one");
    linkedList.append("two");
    linkedList.append("three");

    const node0 = linkedList.get(0);
    expect(node0).toBeDefined();
    expect(node0?.value).toBe("one");

    const node2 = linkedList.get(2);
    expect(node2).toBeDefined();
    expect(node2?.value).toBe("three");

    const node4 = linkedList.get(4);
    expect(node4).not.toBeDefined();

    const nodeIndexLesstThanZero = linkedList.get(-1);
    expect(nodeIndexLesstThanZero).not.toBeDefined();
  });

  it("removes node from the end of the linked list", () => {
    const linkedList = new LinkedList<number>();
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(4);

    linkedList.pop();
    expect(linkedList.toString()).toBe("1,2,3");

    linkedList.pop();
    expect(linkedList.toString()).toBe("1,2");

    linkedList.pop();
    expect(linkedList.toString()).toBe("1");
  });

  it("removes node from the head of the linked list", () => {
    const linkedList = new LinkedList<number>();
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(4);

    linkedList.shift();
    expect(linkedList.toString()).toBe("2,3,4");

    linkedList.shift();
    expect(linkedList.toString()).toBe("3,4");

    linkedList.shift();
    expect(linkedList.toString()).toBe("4");

    linkedList.shift();
    expect(linkedList.toString()).toBe("");
  });
});
