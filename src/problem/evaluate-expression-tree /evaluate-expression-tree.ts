/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BinaryTree } from "@/tree/binary-tree";

/**
 * We assume the tree will always be a valid expression tree.
 * Each operator also works as a grouping symbol, meaning the bottom of the tree is always evaluated first,
 * regardless of the operator.
 *
 * @param tree - the given tree
 * @returns - the single result
 */
export function evaluateExpressionTree(tree: BinaryTree<number>): number {
  if (tree.value >= 0) return tree.value;

  const leftValue = evaluateExpressionTree(tree.left!);
  const rightValue = evaluateExpressionTree(tree.right!);

  if (tree.value === -1) return leftValue + rightValue;
  if (tree.value === -2) return leftValue - rightValue;
  if (tree.value === -3) return Math.trunc(leftValue / rightValue);

  return leftValue * rightValue;
}
