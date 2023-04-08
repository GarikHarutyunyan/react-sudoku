import './matrix.css';
import {Cell} from '../cell/Cell';
import {ICoordinate} from '../../../../data-structures';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeActiveCoordinate,
  selectActiveCoordinate,
} from '../../../../store/levelSlice';
import {useCallback} from 'react';

const matrix = Array(9).fill(Array(9).fill(0));

const Matrix = (): JSX.Element => {
  const activeCell = useSelector(selectActiveCoordinate);
  const dispatch = useDispatch();

  const onActiveCellChange = useCallback(
    (coordinate: ICoordinate) => dispatch(changeActiveCoordinate(coordinate)),
    []
  );

  return (
    <div className={'matrix'}>
      {matrix.map((row, y) => {
        return (
          <div key={y} className={'matrix__row'}>
            {row.map((_cell: number, x: number) => {
              const isCellActive: boolean =
                !!activeCell && activeCell.x === x && activeCell.y === y;

              return (
                <Cell
                  key={x}
                  x={x}
                  y={y}
                  isActive={isCellActive}
                  onActiveCellChange={onActiveCellChange}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export {Matrix};
