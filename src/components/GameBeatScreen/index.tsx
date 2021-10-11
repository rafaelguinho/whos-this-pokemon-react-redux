import React from "react";
import { useHistory } from "react-router";
import { AppContainer } from "../../app-styles";
import Button from "../Button/styles";

const GameBeatScreen: React.FC = () => {
  let history = useHistory();

  return (
    <AppContainer>
      <div>
        <h1>Congratulations!</h1>
        <Button show onClick={(e) => history.push("/")}>
          New game
        </Button>
      </div>
    </AppContainer>
  );
};

export default GameBeatScreen;
