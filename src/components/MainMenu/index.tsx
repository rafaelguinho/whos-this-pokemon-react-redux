import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { setLevel } from "../../features/game/game-slice";

const MainMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <ul>
      <li>
        <button onClick={() => dispatch(setLevel(1))}>Easy</button>
      </li>
      <li>
        <button onClick={() => dispatch(setLevel(2))}>Normal</button>
      </li>
      <li>
        <button onClick={() => dispatch(setLevel(3))}>Hard</button>
      </li>
    </ul>
  );
};

export default MainMenu;
