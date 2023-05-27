import LinkedList from "../linked-list";

describe("LinkedList", () => {
  it("creates an empty linked list", () => {
    const linkedList = new LinkedList();
    expect(linkedList.toArray()).toStrictEqual([]);
  });

  it("prepends node to linked list", () => {
    const linkedList = new LinkedList();

    linkedList.prepend(2);
    expect(linkedList.head?.toString()).toBe("2");
    expect(linkedList.tail?.toString()).toBe("2");

    linkedList.append(1);
    linkedList.prepend(3);

    expect(linkedList.toString()).toBe("3,2,1");
  });

  it("appends node to linked list", () => {
    const linkedList = new LinkedList();

    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    expect(linkedList.toString()).toBe("1,2,3");
    expect(linkedList.tail?.next).toBeNull();
  });

  it("deletes node by value from linked list", () => {
    const linkedList = new LinkedList();

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
    const linkedList = new LinkedList();

    expect(linkedList.deleteHead()).toBeNull();

    linkedList.append(1);
    linkedList.append(2);

    expect(linkedList.head?.toString()).toBe("1");
    expect(linkedList.tail?.toString()).toBe("2");

    const deletedNode1 = linkedList.deleteHead();

    expect(deletedNode1.value).toBe(1);
    expect(linkedList.toString()).toBe("2");
    expect(linkedList.head?.toString()).toBe("2");
    expect(linkedList.tail?.toString()).toBe("2");

    const deletedNode2 = linkedList.deleteHead();

    expect(deletedNode2.value).toBe(2);
    expect(linkedList.toString()).toBe("");
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it("deletes linked list tail", () => {
    const linkedList = new LinkedList();

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
});
