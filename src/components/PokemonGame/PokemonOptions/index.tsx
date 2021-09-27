import OptionsSelectOne from "../../OptionsSelectOne";
import { PokemonOptionsProps } from "./types";

const PokemonOptions: React.FC<PokemonOptionsProps> = ({
  options,
  isActive,
  optionsClickAction,
}: PokemonOptionsProps) => {
  return (
    <OptionsSelectOne
      options={options}
      isActive={isActive}
      optionsClickAction={optionsClickAction}
    />
  );
};

export default PokemonOptions;
