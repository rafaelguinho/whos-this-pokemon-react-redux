import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../features/game/game-slice";
import { apiSlice } from "../features/pokemons/pokemons-api-slice";
import { pokemonsNamesSlice } from "../features/pokemons/pokemons-names-slice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [pokemonsNamesSlice.reducerPath]: pokemonsNamesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootsState = ReturnType<typeof store.getState>;
