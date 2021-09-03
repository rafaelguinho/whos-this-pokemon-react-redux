import React from "react";
import PokemonDraw from "./PokemonDraw";

const PokemonGame: React.FC = () => {
  return (
    <>
      <PokemonDraw selectedPokemonId={1} drawSilhouette={true} />
    </>
  );
};

export default PokemonGame;
