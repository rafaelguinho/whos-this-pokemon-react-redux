import { PokemonOption } from "../types";

export interface PokemonOptionsProps {
  options: PokemonOption[] | null;
  isActive: boolean;
  optionsClickAction: Function;
}
