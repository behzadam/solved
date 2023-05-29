import LinkedList from "../linked-list";

type Item = { key: number; value: string };

describe("LinkedList", () => {
  it("creates an empty linked list", () => {
    const linkedList = new LinkedList();
    expect(linkedList.toArray()).toStrictEqual([]);
  });

  it("creates lined list with complex type and custom stringify function.", () => {
    const linkedList = new LinkedList<Item>();

    const nodeValue1 = { key: 1, value: "v1" } as Item;
    const nodeValue2 = { key: 2, value: "v2" } as Item;

    linkedList.append(nodeValue1).prepend(nodeValue2);

    expect(linkedList.head?.value).toStrictEqual(nodeValue2);
    expect(linkedList.tail?.value).toStrictEqual(nodeValue1);

    const itemStringifier = (item: Item): string => `${item.key}:${item.value}`;
    expect(linkedList.toString(itemStringifier)).toBe("2:v2,1:v1");
  });

  it("creates linked list from array", () => {
    const linkedList = new LinkedList();
    linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);

    expect(linkedList.toString()).toBe("1,1,2,3,3,3,4,5");
  });

  it("prepends node to linked list", () => {
    const linkedList = new LinkedList<number>();

    linkedList.prepend(2);
    expect(linkedList.head?.toString()).toBe("2");
    expect(linkedList.tail?.toString()).toBe("2");

    linkedList.append(1);
    linkedList.prepend(3);

    expect(linkedList.toString()).toBe("3,2,1");
  });

  it("appends node to linked list", () => {
    const linkedList = new LinkedList<number>();

    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    expect(linkedList.toString()).toBe("1,2,3");
    expect(linkedList.tail?.next).toBeNull();
  });

  it("deletes node by value from linked list", () => {
    const linkedList = new LinkedList<number>();

    expect(linkedList.delete(5)).toBeNull();

    linkedList.append(1);
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(4);
    linkedList.append(5);

    expect(linkedList.head?.toString()).toBe("1");
    expect(linkedList.tail?.toString()).toBe("5");

    const deletedNode = linkedList.delete(3);
    expect(deletedNode?.value).toBe(3);
    expect(linkedList.toString()).toBe("1,1,2,4,5");

    linkedList.delete(3);
    expect(linkedList.toString()).toBe("1,1,2,4,5");

    linkedList.delete(1);
    expect(linkedList.toString()).toBe("2,4,5");

    expect(linkedList.head?.toString()).toBe("2");
    expect(linkedList.tail?.toString()).toBe("5");

    linkedList.delete(5);
    expect(linkedList.toString()).toBe("2,4");

    expect(linkedList.head?.toString()).toBe("2");
    expect(linkedList.tail?.toString()).toBe("4");

    linkedList.delete(4);
    expect(linkedList.toString()).toBe("2");

    expect(linkedList.head?.toString()).toBe("2");
    expect(linkedList.tail?.toString()).toBe("2");

    linkedList.delete(2);
    expect(linkedList.toString()).toBe("");
  });

  it("deletes linked list head", () => {
    const linkedList = new LinkedList<number>();

    expect(linkedList.deleteHead()).toBeNull();

    linkedList.append(1);
    linkedList.append(2);

    expect(linkedList.head?.toString()).toBe("1");
    expect(linkedList.tail?.toString()).toBe("2");

    const deletedNode1 = linkedList.deleteHead();

    expect(deletedNode1?.value).toBe(1);
    expect(linkedList.toString()).toBe("2");
    expect(linkedList.head?.toString()).toBe("2");
    expect(linkedList.tail?.toString()).toBe("2");

    const deletedNode2 = linkedList.deleteHead();

    expect(deletedNode2?.value).toBe(2);
    expect(linkedList.toString()).toBe("");
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it("deletes linked list tail", () => {
    const linkedList = new LinkedList<number>();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    expect(linkedList.head?.toString()).toBe("1");
    expect(linkedList.tail?.toString()).toBe("3");

    const deletedNode1 = linkedList.deleteTail();

    expect(deletedNode1?.value).toBe(3);
    expect(linkedList.toString()).toBe("1,2");
    expect(linkedList.head?.toString()).toBe("1");
    expect(linkedList.tail?.toString()).toBe("2");

    const deletedNode2 = linkedList.deleteTail();

    expect(deletedNode2?.value).toBe(2);
    expect(linkedList.toString()).toBe("1");
    expect(linkedList.head?.toString()).toBe("1");
    expect(linkedList.tail?.toString()).toBe("1");

    const deletedNode3 = linkedList.deleteTail();

    expect(deletedNode3?.value).toBe(1);
    expect(linkedList.toString()).toBe("");
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it("finds node by custom compare function", () => {
    const comparatorFunction = (a: Item, b: Item) => {
      if (a.value === b.value) {
        return 0;
      }
      return a.value < b.value ? -1 : 1;
    };

    const linkedList = new LinkedList<Item>(comparatorFunction);

    linkedList
      .append({ key: 1, value: "test1" })
      .append({ key: 2, value: "test2" })
      .append({ key: 3, value: "test3" });

    const node = linkedList.find({ value: { key: 2, value: "test2" } });

    expect(node).toBeDefined();
    expect(node?.value?.key).toBe(2);
    expect(node?.value?.value).toBe("test2");
    expect(linkedList.find({ value: { key: 2, value: "test5" } })).toBeNull();
  });

  it("reverses linked list", () => {
    const linkedList = new LinkedList<number>();

    // Add test values to linked list.
    linkedList.append(1).append(2).append(3);

    expect(linkedList.toString()).toBe("1,2,3");
    expect(linkedList.head?.value).toBe(1);
    expect(linkedList.tail?.value).toBe(3);

    // Reverse linked list.
    linkedList.reverse();
    expect(linkedList.toString()).toBe("3,2,1");
    expect(linkedList.head?.value).toBe(3);
    expect(linkedList.tail?.value).toBe(1);

    // Reverse linked list back to initial state.
    linkedList.reverse();
    expect(linkedList.toString()).toBe("1,2,3");
    expect(linkedList.head?.value).toBe(1);
    expect(linkedList.tail?.value).toBe(3);
  });
});
