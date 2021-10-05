import React from "react";
import { useAppSelector } from "../../app/hooks";
import img from './life.png'

const LifesPanel: React.FC = () => {
  const lifes: number = useAppSelector((state) => state.game.lifes);

  let indents: JSX.Element[] = [];
  for (let i = 0; i < lifes; i++) {
    indents.push(<img src={img} key={i} />);
  }

  return <div>{indents}</div>;
};

export default LifesPanel;
