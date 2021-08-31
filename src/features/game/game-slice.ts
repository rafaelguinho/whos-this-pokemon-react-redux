import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "./types";

interface GameState {
  lifes: number;
  currentPokemon: Pokemon | null;
  timeIsOver: boolean;
  gameIsOver: boolean;
  level: number;
  score: number;
}

const initialState: GameState = {
  lifes: 3,
  currentPokemon: null,
  timeIsOver: false,
  gameIsOver: false,
  level: 1,
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
      var allowedLevels: Array<number> = [1, 2];

      if (allowedLevels.some((l) => l === action.payload)) {
        state.level = action.payload;
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
