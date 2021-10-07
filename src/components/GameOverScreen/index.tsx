import React from "react";
import { useHistory } from "react-router";
import Button from "../Button/styles";

const GameOverScreen: React.FC = () => {
  let history = useHistory();

  return (
    <div>
      <h1>Game over</h1>
      <Button show onClick={(e) => history.push("/")}>New game</Button>
    </div>
  );
};

export default GameOverScreen;
