import React from "react";
import { PokemonOptionsProps } from "./types";

const PokemonOptions: React.FC<PokemonOptionsProps> = ({
  options,
}: PokemonOptionsProps) => {
  if (!options) return <></>;

  return (
    <ul>
      {options.map((o) => (
        <li>{o.name}</li>
      ))}
    </ul>
  );
};

export default PokemonOptions;
