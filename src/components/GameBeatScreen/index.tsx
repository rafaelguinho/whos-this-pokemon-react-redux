import React from "react";
import { useHistory } from "react-router";
import Button from "../Button/styles";

const GameBeatScreen: React.FC = () => {
  let history = useHistory();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Game beat</h1>
        <Button onClick={(e) => history.push("/")}>New game</Button>
      </header>
    </div>
  );
};

export default GameBeatScreen;
