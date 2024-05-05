import { BinaryTree } from "@/tree/binary-tree";
import { evaluateExpressionTree } from "./evaluate-expression-tree";

describe("evaluateExpressionTree", () => {
  it("evaluates the given tree and returns a single resulting", () => {
    const tree = new BinaryTree(-1);
    tree.left = new BinaryTree(-2);
    tree.right = new BinaryTree(-3);

    tree.left.left = new BinaryTree(-4);
    tree.left.right = new BinaryTree(2);
    tree.left.left.left = new BinaryTree(2);
    tree.left.left.right = new BinaryTree(3);

    tree.right.left = new BinaryTree(8);
    tree.right.right = new BinaryTree(3);

    const result = evaluateExpressionTree(tree);
    expect(result).toBe(6);
  });
});
