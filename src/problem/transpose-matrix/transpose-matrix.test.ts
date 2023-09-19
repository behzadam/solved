import { transposeMatrix } from "./transpose-matrix";

describe("transposeMatrix", () => {
  it("returns an empty array with the given empty matrix", () => {
    const matrix: number[][] = [];
    const transposed = new Array<number>();

    expect(transposeMatrix(matrix)).toEqual(transposed);
  });

  it("transposes the given matrix", () => {
    expect(
      transposeMatrix([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])
    ).toEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ]);

    expect(transposeMatrix([[1, 2, 3], [4, 5, 6], [7]])).toEqual([
      [1, 4, 7],
      [2, 5],
      [3, 6],
    ]);

    expect(transposeMatrix([[1, 2]])).toEqual([[1], [2]]);
  });
});
