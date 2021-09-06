import React from "react";
import useCountDownTimer from "../../hooks/countDown";
import PokemonDraw from "./PokemonDraw";

const PokemonGame: React.FC = () => {
  const { timeLeft, timesUp } = useCountDownTimer(8);

  return (
    <>
      <p>{timesUp ? 'acabou': 'ainda tem'}</p>
      <progress id="file" value={timeLeft} max="8"></progress>
      <PokemonDraw selectedPokemonId={1} drawSilhouette={true} />
    </>
  );
};

export default PokemonGame;
