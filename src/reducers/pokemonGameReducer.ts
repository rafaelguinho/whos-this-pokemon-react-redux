import initialState from "./pokemonGameReducerInitialState";
import { PokemonGameReducerState } from "./types";

export enum PokemonGameActionKind {
  INIT_QUIZ = "initQuiz",
  SET_OPTIONS_AND_CURRENT_POKEMON = "setOptionsAndCurrentPokemon",
  SET_ANSWER = "setAnswer",
  END_QUIZ = "endQuiz",
  CAN_SELECT_NEXT_POKEMON = "CanSelectNextProkemon",
  SELECT_NEW_POKEMON = "SelectNewProkemon",
  NOT_SELECT_NEW_POKEMON = "NotSelectNewProkemon",
}

interface PokemonGameAction {
  type: PokemonGameActionKind;
  payload: PokemonGameReducerState | null | undefined;
}

const reducer = (state: PokemonGameReducerState, action: PokemonGameAction) => {
  const { type, payload } = action;

  switch (type) {
    case PokemonGameActionKind.INIT_QUIZ:
      return {
        ...initialState,
      };
    case PokemonGameActionKind.SELECT_NEW_POKEMON:
      return {
        ...initialState,
        selectNewProkemon: true,
        canSelectNextProkemon: false,
      };
    case PokemonGameActionKind.NOT_SELECT_NEW_POKEMON:
      return {
        ...initialState,
        selectNewProkemon: false,
        canSelectNextProkemon: false,
      };
    case PokemonGameActionKind.SET_OPTIONS_AND_CURRENT_POKEMON:
      return {
        ...state,
        currentOptions: payload?.currentOptions,
        currentPokemon: payload?.currentPokemon,
        selectNewProkemon: false,
        canSelectNextProkemon: false,
      } as PokemonGameReducerState;

    case PokemonGameActionKind.SET_ANSWER:
      return {
        ...state,
        isRightAnswer: payload?.isRightAnswer,
        canSelectNextProkemon: true,
        endQuiz: true,
      } as PokemonGameReducerState;
    case PokemonGameActionKind.END_QUIZ:
      return {
        ...state,
        endQuiz: true,
        canSelectNextProkemon: true,
      } as PokemonGameReducerState;
    default:
      throw Error();
  }
};

export default reducer;
