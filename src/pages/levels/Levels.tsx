import {ReactNode, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getLevels, selectLevels} from '../../store/levelSlice';
import {ILevel} from '../../data-structures';
import {Link} from 'react-router-dom';

const Levels = (): JSX.Element => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getLevels());
  }, []);

  const levels: ILevel[] = useSelector(selectLevels);

  return (
    <>
      {levels.map((level: ILevel, index: number) => {
        return (
          <h2 key={level.id}>
            <Link to={`/level/${level.id}`}>{`Level ${index + 1}`}</Link>
          </h2>
        );
      })}
    </>
  );
};

export {Levels};
