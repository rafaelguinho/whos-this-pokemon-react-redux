import React from "react";
import { useAppSelector } from "../../app/hooks";
import img from "./life.png";
import { Life, LifePanel } from "./styles";

const LifesPanel: React.FC = () => {
  const lifes: number = useAppSelector((state) => state.game.lifes);

  console.log(lifes);

  let indents: JSX.Element[] = [];
  for (let i = 0; i < lifes; i++) {
    indents.push(<Life src={img} key={i} />);
  }

  return <LifePanel>{indents}</LifePanel>;
};

export default LifesPanel;
