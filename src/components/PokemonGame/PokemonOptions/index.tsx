import { useState } from "react";
import { PokemonOption } from "../types";
import { PokemonOptionsProps } from "./types";

const PokemonOptions: React.FC<PokemonOptionsProps> = ({
  options,
  isActive,
  optionsClickAction,
}: PokemonOptionsProps) => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const selectOption = (option: PokemonOption) => {
    optionsClickAction(option);
    setSelectedItemId(option.id);
  };

  if (!options) return <></>;

  return (
    <ul>
      {options.map((o) => (
        <li
          className={
            selectedItemId
              ? selectedItemId === o.id
                ? "highlighter"
                : "not-highlighter"
              : ""
          }
          key={o.id}
          onClick={(e) => (isActive ? selectOption(o) : function () {})}
        >
          {o.name}
        </li>
      ))}
    </ul>
  );
};

export default PokemonOptions;
