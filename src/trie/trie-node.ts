import { Nullable } from "@/types";

export default class TrieNode {
  public character: string;
  public isWord: boolean;
  private _children: Map<string, TrieNode>;

  constructor(character: string, isWord = false) {
    this.character = character;
    this.isWord = isWord;
    this._children = new Map<string, TrieNode>();
  }

  public getChild(character: string): Nullable<TrieNode> {
    return this._children.get(character);
  }

  public addChild(character: string, isWord = false): TrieNode {
    if (!this._children.has(character)) {
      this._children.set(character, new TrieNode(character, isWord));
    }

    const childNode = this._children.get(character) as TrieNode;
    // In cases similar to adding "car" after "carpet" we need to mark "r" character as complete.
    childNode.isWord = childNode?.isWord || isWord;

    return childNode;
  }

  public removeChild(character: string): TrieNode {
    const childNode = this.getChild(character);

    // Delete childNode only if:
    // - childNode doesn't have children,
    // - childNode.isWord === false.
    if (childNode && !childNode.isWord && !childNode.hasChildren()) {
      this._children.delete(character);
    }
    return this;
  }

  public hasChild(character: string) {
    return this._children.has(character);
  }

  public hasChildren() {
    return this._children.size !== 0;
  }

  public suggestChildren() {
    return [...this._children.keys()];
  }

  public toString() {
    let childrenAsString = this.suggestChildren().toString();
    childrenAsString = childrenAsString ? `:${childrenAsString}` : "";
    const isCompleteString = this.isWord ? "*" : "";

    return `${this.character}${isCompleteString}${childrenAsString}`;
  }
}
