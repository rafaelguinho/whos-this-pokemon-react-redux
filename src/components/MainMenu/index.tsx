import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { setLevel } from "../../features/game/game-slice";
import { Option } from "../types";
import OptionsSelectOne from "../OptionsSelectOne";
import { useHistory } from "react-router";

const MainMenu: React.FC = () => {
  let history = useHistory();
  const dispatch = useAppDispatch();

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
    },
  ];

  const optionsClickAction = (o: Option) => {
    dispatch(setLevel(o.id));
    console.log(o.name);
    history.push("/game");
  };

  return (
    <OptionsSelectOne
      options={options}
      optionsClickAction={optionsClickAction}
    />
  );
};

export default MainMenu;
