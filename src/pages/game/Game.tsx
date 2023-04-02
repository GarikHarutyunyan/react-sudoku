import {useEffect} from 'react';
import {Matrix} from './components/matrix/Matrix';
import './game.css';
import {useDispatch} from 'react-redux';
import {getLevel, getLevels} from '../../store/levelSlice';
import {NumberBoard} from './components/number-board/NumberBoard';

const Game = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getLevel('a'));
  }, []);

  return (
    <div className={'game'}>
      <Matrix />
      <NumberBoard />
    </div>
  );
};

export {Game};
