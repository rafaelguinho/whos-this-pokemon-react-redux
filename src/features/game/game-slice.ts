import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPokemonsRange } from "../../configurations/level-generations-config";
import { RangePokemons } from "../../configurations/types";
import { Pokemon } from "./types";

interface LevelConfigurations {
  level: number;
  init: number;
  end: number;
}

interface GameState {
  canStartNewGame: boolean;
  gameStarted: boolean;
  lifes: number;
  timeIsOver: boolean;
  gameIsOver: boolean;
  gameBeat: boolean;
  isTheLastRound: boolean;
  levelConfigurations: LevelConfigurations | null;
  score: number;
  proposedPokemons: Array<Pokemon>;
}

const initialState: GameState = {
  canStartNewGame: true,
  gameStarted: false,
  lifes: 3,
  timeIsOver: false,
  gameIsOver: false,
  gameBeat: false,
  isTheLastRound: false,
  levelConfigurations: null,
  score: 0,
  proposedPokemons: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startNewGame(state) {
      state.canStartNewGame = initialState.canStartNewGame;
      state.gameStarted = initialState.gameStarted;
      state.lifes = initialState.lifes;
      state.timeIsOver = initialState.timeIsOver;
      state.gameIsOver = initialState.gameIsOver;
      state.gameBeat = initialState.gameBeat;
      state.score = initialState.score;
      state.proposedPokemons = initialState.proposedPokemons;
    },
    gameStated(state) {
      state.canStartNewGame = false;
      state.gameStarted = true;
    },
    lostALife(state) {
      if (state.lifes >= 1) {
        state.lifes--;
      }

      if (state.lifes === 0) {
        state.gameIsOver = true;
      }
    },
    indicateTimeIsOver(state) {
      state.timeIsOver = true;
    },
    addProposedPokemon(state, action: PayloadAction<Pokemon>) {
      state.proposedPokemons.push(action.payload);

      if (state.proposedPokemons.length === state?.levelConfigurations?.end) {
        state.isTheLastRound = true;
      }
    },
    indicateStartTimer(state) {
      state.timeIsOver = false;
    },
    setLevel(state, action: PayloadAction<number>) {
      var allowedLevels: Array<number> = [1, 2, 3];

      if (allowedLevels.some((l) => l === action.payload)) {
        const level: number = action.payload;

        const { init, end }: RangePokemons = getPokemonsRange(level);

        const newLevelConfigurations: LevelConfigurations = {
          level,
          init,
          end,
        };

        state.levelConfigurations = newLevelConfigurations;
      }
    },
    addPoint(state) {
      state.score++;

      if (state.isTheLastRound) {
        state.gameBeat = true;
      }
    },
  },
});

export const {
  startNewGame,
  gameStated,
  lostALife,
  indicateTimeIsOver,
  indicateStartTimer,
  setLevel,
  addPoint,
  addProposedPokemon,
} = gameSlice.actions;
export default gameSlice.reducer;
