import './number-board.css';

const emptyArray = Array(9).fill(undefined);

const NumberBoard = () => {
  return (
    <div className={'number-board'}>
      {emptyArray.map((_empty, index) => {
        return <div className={'number-board__element'}>{index + 1}</div>;
      })}
    </div>
  );
};

export {NumberBoard};
