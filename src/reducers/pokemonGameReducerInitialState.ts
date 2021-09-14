import { PokemonGameReducerState } from "./types";

const initialState: PokemonGameReducerState = {
  currentOptions: null,
  currentPokemon: null,
  isRightAnswer: null,
  pokemonAnswer: null,
  endQuiz: false
};

export default initialState;
