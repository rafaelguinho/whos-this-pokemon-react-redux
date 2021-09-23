import React from "react";
import { PokemonOptionsProps } from "./types";

const PokemonOptions: React.FC<PokemonOptionsProps> = ({
  options,
  isActive,
  optionsClickAction,
}: PokemonOptionsProps) => {
  if (!options) return <></>;

  return (
    <ul>
      {options.map((o) => (
        <li key={o.id}
          onClick={(e) => (isActive ? optionsClickAction(o) : function () {})}
        >
          {o.name}
        </li>
      ))}
    </ul>
  );
};

export default PokemonOptions;
