import React from "react";
import { useHistory } from "react-router";

const GameOverScreen: React.FC = () => {
  let history = useHistory();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Game over</h1>
        <button onClick={(e) => history.push("/")}>New game</button>
      </header>
    </div>
  );
};

export default GameOverScreen;
