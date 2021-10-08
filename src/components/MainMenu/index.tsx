import React, {useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setLevel, startNewGame } from "../../features/game/game-slice";
import { Option } from "../types";
import OptionsSelectOne from "../OptionsSelectOne";
import { useHistory } from "react-router";

const MainMenu: React.FC = () => {
  let history = useHistory();
  const dispatch = useAppDispatch();

  const canStartNewGame = useAppSelector(
    (state) => state.game.canStartNewGame
  );

  const options: Option[] = [
    {
      id: 1,
      name: "Easy",
    },
    {
      id: 2,
      name: "Normal",
    },
    {
      id: 3,
      name: "Hard",
    }
  ];

  useEffect(() => {
    if (canStartNewGame) {

      history.push("/game");
    }
  }, [canStartNewGame, history]);

  const optionsClickAction = (o: Option) => {
    dispatch(setLevel(o.id));
    dispatch(startNewGame());
  };

  return (
    <OptionsSelectOne
      options={options}
      optionsClickAction={optionsClickAction}
    />
  );
};

export default MainMenu;
