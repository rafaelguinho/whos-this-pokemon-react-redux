import { PokemonGameReducerState } from "./types";

const initialState: PokemonGameReducerState = {
  currentOptions: null,
  currentPokemon: null,
  isRightAnswer: null,
  pokemonAnswer: null,
  endQuiz: false,
  canSelectNextProkemon: false,
  selectNewProkemon: true,
};

export default initialState;
