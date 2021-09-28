import { PokemonGameReducerState } from "./types";

const initialState: PokemonGameReducerState = {
  currentOptions: null,
  currentPokemon: null,
  isRightAnswer: null,
  pokemonAnswer: null,
  answered: false,
  endQuiz: false,
  canSelectNextProkemon: false,
  selectNewProkemon: true,
  canStartCountDown: false,
};

export default initialState;
