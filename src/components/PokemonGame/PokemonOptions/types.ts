import { PokemonOption } from "../types";

export interface PokemonOptionsProps {
  options: PokemonOption[] | null;
  wrongOptionSelected: boolean | null;
  isActive: boolean;
  optionsClickAction: Function;
}
