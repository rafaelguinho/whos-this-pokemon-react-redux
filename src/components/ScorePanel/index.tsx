import React from "react";
import { useAppSelector } from "../../app/hooks";

const ScorePanel: React.FC = () => {
  const score: number = useAppSelector((state) => state.game.score);
  return (
    <div>
      <p>
        {score} {score <= 1 ? "pt" : "pts"}
      </p>
    </div>
  );
};

export default ScorePanel;
