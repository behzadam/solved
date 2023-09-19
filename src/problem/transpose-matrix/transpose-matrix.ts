/**
 * The transpose of a matrix is a flipped version of the original matrix across its main diagonal (which runs from top-left to bottom-right); it switches the row and column indices of the original matrix.
 * @param matrix - the given matrix to transpose
 * @returns - the transposed matrix
 */
export function transposeMatrix(matrix: number[][]): number[][] {
  if (matrix.length == 0) return [];

  const matrixHeight = matrix[0].length;
  const matrixWidth = matrix.length;

  // create a new matrix
  const transposedMatrix = new Array(matrixHeight);

  for (let col = 0; col < matrixHeight; col++) {
    transposedMatrix[col] = new Array(matrixWidth);

    for (let row = 0; row < matrixWidth; row++) {
      transposedMatrix[col][row] = matrix[row][col];
    }
  }

  return transposedMatrix;
}
