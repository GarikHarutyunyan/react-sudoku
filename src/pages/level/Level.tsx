import {useEffect} from 'react';
import {Matrix} from './components/matrix/Matrix';
import './level.css';
import {useDispatch, useSelector} from 'react-redux';
import {checkIsSolved, getLevel, selectLevel} from '../../store/levelSlice';
import {NumberBoard} from './components/number-board/NumberBoard';
import {Win} from './components/win/Win';
import {Link, useParams} from 'react-router-dom';
import {Actions} from './components/actions/Actions';
import {
  changeLastAvailableLevel,
  selectLastAvailableLevel,
} from '../../store/userSlice';

const Level = () => {
  const dispatch = useDispatch<any>();
  const activeLevel = useSelector(
    selectLevel,
    (level1, level2) => level1?.id === level2?.id
  );
  const lastAvailableLevel: number = useSelector(selectLastAvailableLevel);
  const isSolved = useSelector(checkIsSolved);
  const {id} = useParams();

  useEffect(() => {
    dispatch(getLevel(id as string));
  }, []);

  useEffect(() => {
    if (isSolved) {
      dispatch(changeLastAvailableLevel(activeLevel?.index || 0));
    }
  }, [isSolved]);

  if (activeLevel && activeLevel?.index > lastAvailableLevel) {
    return (
      <>
        <h3>
          <Link to={'/levels'}>{'Back'}</Link>
        </h3>
        <h2>{'This level is unavailable for you!'}</h2>
      </>
    );
  }

  return (
    <div className={'level'}>
      <h3>
        <Link to={'/levels'}>{'Back'}</Link>
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
