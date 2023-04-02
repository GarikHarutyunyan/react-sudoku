import {useEffect} from 'react';
import {Matrix} from './components/matrix/Matrix';
import './game.css';
import {useDispatch, useSelector} from 'react-redux';
import {checkIsSolved, getLevel} from '../../store/levelSlice';
import {NumberBoard} from './components/number-board/NumberBoard';
import {Win} from './components/win/Win';

const Game = () => {
  const dispatch = useDispatch<any>();
  const isSolved = useSelector(checkIsSolved);

  useEffect(() => {
    dispatch(getLevel('b'));
  }, []);

  return (
    <div className={'game'}>
      {isSolved ? (
        <Win />
      ) : (
        <>
          <Matrix />
          <NumberBoard />
        </>
      )}
    </div>
  );
};

export {Game};
