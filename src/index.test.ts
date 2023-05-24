import { MaxHeap, MinHeap } from "./heap";

describe("Index", () => {
  it("imports modules", () => {
    expect(MinHeap).not.toBeNull();
    expect(MaxHeap).not.toBeNull();
  });
});
