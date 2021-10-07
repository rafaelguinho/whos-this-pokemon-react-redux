import OptionsSelectOne from "../../OptionsSelectOne";
import { PokemonOptionsProps } from "./types";

const PokemonOptions: React.FC<PokemonOptionsProps> = ({
  options,
  wrongOptionSelected,
  isActive,
  optionsClickAction,
}: PokemonOptionsProps) => {
  return (
    <OptionsSelectOne
      wrongOptionSelected={wrongOptionSelected}
      options={options}
      isActive={isActive}
      optionsClickAction={optionsClickAction}
    />
  );
};

export default PokemonOptions;
