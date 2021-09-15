import { PokemonOption } from "../components/PokemonGame/types";
import { Pokemon } from "../features/game/types";

export interface PokemonGameReducerState {
  currentOptions: PokemonOption[] | null;
  currentPokemon: Pokemon | null;
  pokemonAnswer: Pokemon | null;
  isRightAnswer: boolean | null;
  endQuiz: boolean;
  selectNewProkemon: boolean;
  canSelectNextProkemon: boolean;
}
