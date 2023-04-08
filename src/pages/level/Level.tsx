import {useEffect} from 'react';
import {Matrix} from './components/matrix/Matrix';
import './level.css';
import {useDispatch, useSelector} from 'react-redux';
import {checkIsSolved, getLevel} from '../../store/levelSlice';
import {NumberBoard} from './components/number-board/NumberBoard';
import {Win} from './components/win/Win';
import {Link, useParams} from 'react-router-dom';
import {Actions} from './components/actions/Actions';

const Level = () => {
  const dispatch = useDispatch<any>();
  const isSolved = useSelector(checkIsSolved);
  const {id} = useParams();

  useEffect(() => {
    dispatch(getLevel(id as string));
  }, []);

  return (
    <div className={'level'}>
      <h3>
        <Link to={'/'}>{'Back'}</Link>
      </h3>
      {isSolved ? (
        <Win />
      ) : (
        <>
          <Matrix />
          <NumberBoard />
          <Actions />
        </>
      )}
    </div>
  );
};

export {Level};
