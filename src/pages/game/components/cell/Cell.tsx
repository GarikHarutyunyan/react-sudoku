import classNames from "classnames";
import React, { ReactNode } from "react";
import "./cell.css";

interface ICellProps {
  x: number;
  y: number;
  isActive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const Cell = (props: ICellProps): JSX.Element => {
  const { x, y, isActive, style, className } = props;

  return (
    <div
      style={style}
      className={classNames(className, "cell", {
        cell_active: isActive,
        "cell_bold-top-border": y === 3 || y === 6,
        "cell_bold-left-border": x === 3 || x === 6,
      })}
    ></div>
  );
};

export { Cell };
