import {ICoordinate} from '../data-structures';

export class MatrixUtils {
  static getFilledCoordinates = (matrix: number[][]): ICoordinate[] => {
    return (
      matrix.reduce(
        (matrixCoordinates: ICoordinate[], row: number[], y: number) => {
          const coordinates: ICoordinate[] = row.reduce(
            (rowCoordinates: ICoordinate[], cell: number, x: number) => {
              if (cell) {
                return [...rowCoordinates, {x, y}];
              }
              return rowCoordinates;
            },
            []
          );

          return [...matrixCoordinates, ...coordinates];
        },
        []
      ) || []
    );
  };
}
