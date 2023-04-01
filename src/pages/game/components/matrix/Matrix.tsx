import { ReactNode } from "react";
import "./matrix.css";
import { Cell } from "../cell/Cell";

const Matrix = (): JSX.Element => {
  const matrix = Array(9).fill(Array(9).fill(0));

  return (
    <div className={"matrix"}>
      {matrix.map((row, y) => {
        return (
          <div className={"matrix__row"}>
            {row.map((_cell: unknown, x: number) => {
              return <Cell x={x} y={y} isActive={false} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export { Matrix };
