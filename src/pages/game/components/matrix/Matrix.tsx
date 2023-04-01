import { ReactNode, useState } from "react";
import "./matrix.css";
import { Cell } from "../cell/Cell";
import { ICoordinate } from "../../../../data-structures";

const matrix = Array(9).fill(Array(9).fill(0));

const Matrix = (): JSX.Element => {
  const [activeCell, setActiveSell] = useState<ICoordinate | null>(null);

  return (
    <div className={"matrix"}>
      {matrix.map((row, y) => {
        return (
          <div className={"matrix__row"}>
            {row.map((_cell: unknown, x: number) => {
              const isCellActive: boolean =
                !!activeCell && activeCell.x === x && activeCell.y === y;

              return (
                <Cell
                  x={x}
                  y={y}
                  isActive={isCellActive}
                  onActiveCellChange={setActiveSell}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export { Matrix };
