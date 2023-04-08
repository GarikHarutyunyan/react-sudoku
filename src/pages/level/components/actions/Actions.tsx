import {useDispatch, useSelector} from 'react-redux';
import {getLevel, selectLevel} from '../../../../store/levelSlice';
import './actions.css';

export const Actions = () => {
  const dispatch = useDispatch<any>();
  const activeLevel = useSelector(selectLevel);
  const onResetLevel = () => {
    activeLevel && dispatch(getLevel(activeLevel?.id));
  };

  return (
    <div onClick={onResetLevel} className={'actions__button'}>
      {'Reset Level'}
    </div>
  );
};
