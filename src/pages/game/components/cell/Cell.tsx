import classNames from "classnames";
import React, { ReactNode, memo, useCallback } from "react";
import "./cell.css";
import { ICoordinate } from "../../../../data-structures";

interface ICellProps {
  x: number;
  y: number;
  isActive?: boolean;
  onActiveCellChange?: (coordinate: ICoordinate) => void;
  style?: React.CSSProperties;
  className?: string;
}

const Cell = memo((props: ICellProps): JSX.Element => {
  const { x, y, isActive, onActiveCellChange, style, className } = props;

  const onClick = useCallback(() => {
    onActiveCellChange && onActiveCellChange({ x, y });
  }, [onActiveCellChange]);

  return (
    <div
      onClick={onClick}
      style={style}
      className={classNames(className, "cell", {
        cell_active: isActive,
        "cell_bold-top-border": y === 3 || y === 6,
        "cell_bold-left-border": x === 3 || x === 6,
      })}
    ></div>
  );
});

export { Cell };
