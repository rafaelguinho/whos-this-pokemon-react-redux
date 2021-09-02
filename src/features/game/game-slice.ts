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
  lifes: number;
  currentPokemon: Pokemon | null;
  timeIsOver: boolean;
  gameIsOver: boolean;
  levelConfigurations: LevelConfigurations;
  score: number;
}

const initialState: GameState = {
  lifes: 3,
  currentPokemon: null,
  timeIsOver: false,
  gameIsOver: false,
  levelConfigurations: {
    level: 1,
    init: 1,
    end: 151,
  },
  score: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startNewGame(state) {
      state = initialState;
    },
    lostALife(state) {
      if (state.lifes >= 1) {
        state.lifes--;
      }

      if (state.lifes === 0) {
        state.gameIsOver = true;
      }
    },
    setCurrentPokemon(state, action: PayloadAction<Pokemon>) {
      state.currentPokemon = action.payload;
    },
    indicateTimeIsOver(state) {
      state.timeIsOver = true;
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
    },
  },
});

export const {
  startNewGame,
  lostALife,
  setCurrentPokemon,
  indicateTimeIsOver,
  indicateStartTimer,
  setLevel,
  addPoint,
} = gameSlice.actions;
export default gameSlice.reducer;
