import initialState from "./pokemonGameReducerInitialState";
import { PokemonGameReducerState } from "./types";

export enum PokemonGameActionKind {
  INIT_QUIZ = "initQuiz",
  SET_OPTIONS_AND_CURRENT_POKEMON = "setOptionsAndCurrentPokemon",

  START_COUNT_DOWN = "startCountDown",
  STARTED_COUNT_DOWN = "startedCountDown",

  SET_ANSWER = "setAnswer",
  END_CURRENT_QUIZ = "endCurrentQuiz",
  CAN_SELECT_NEXT_POKEMON = "canSelectNextProkemon",
  SELECT_NEW_POKEMON = "selectNewProkemon",
  LOADING_NEW_POKEMON = "loadingNewProkemon",
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
    case PokemonGameActionKind.LOADING_NEW_POKEMON:
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

    case PokemonGameActionKind.START_COUNT_DOWN:
      return {
        ...state,
        canStartCountDown: true,
      } as PokemonGameReducerState;

    case PokemonGameActionKind.STARTED_COUNT_DOWN:
      return {
        ...state,
        canStartCountDown: false,
      } as PokemonGameReducerState;

    case PokemonGameActionKind.SET_ANSWER:
      return {
        ...state,
        isRightAnswer: payload?.isRightAnswer,
        canSelectNextProkemon: true,
        endQuiz: true,
        canStartCountDown: false,
      } as PokemonGameReducerState;
    case PokemonGameActionKind.END_CURRENT_QUIZ:
      return {
        ...state,
        endQuiz: true,
        canSelectNextProkemon: true,
        canStartCountDown: false,
      } as PokemonGameReducerState;
    default:
      throw Error();
  }
};

export default reducer;
