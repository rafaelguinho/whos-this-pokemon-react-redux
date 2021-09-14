import initialState from "./pokemonGameReducerInitialState";
import { PokemonGameReducerState } from "./types";

export enum PokemonGameActionKind {
  INIT_QUIZ = "initQuiz",
  SET_OPTIONS_AND_CURRENT_POKEMON = "setOptionsAndCurrentPokemon",
  SET_ANSWER = "setAnswer",
  END_QUIZ = "endQuiz",
}

interface PokemonGameAction {
  type: PokemonGameActionKind;
  payload: PokemonGameReducerState;
}

const reducer = (state: PokemonGameReducerState, action: PokemonGameAction) => {
  const { type, payload } = action;

  switch (type) {
    case PokemonGameActionKind.INIT_QUIZ:
      return {
        ...initialState,
      };
    case PokemonGameActionKind.SET_OPTIONS_AND_CURRENT_POKEMON:
      return {
        ...state,
        currentOptions: payload.currentOptions,
        currentPokemon: payload.currentPokemon,
      } as PokemonGameReducerState;

    case PokemonGameActionKind.SET_ANSWER:
      return {
        ...state,
        isRightAnswer: payload.isRightAnswer,
        endQuiz: true,
      } as PokemonGameReducerState;
    case PokemonGameActionKind.END_QUIZ:
      return {
        ...state,
        endQuiz: true,
      } as PokemonGameReducerState;
    default:
      throw Error();
  }
};

export default reducer;
