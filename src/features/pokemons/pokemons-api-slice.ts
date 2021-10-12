import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Pokemon } from "../game/types";

const POKEMONS_API_BASE_URL = "https://pokeapi.co/api/v2/";

interface PokemonsResults {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: POKEMONS_API_BASE_URL,
  }),
  endpoints(builder) {
    return {
      fetchPokemons: builder.query<PokemonsResults[], number | void>({
        query(limit = 10) {
          return `/pokemon?limit=${limit}`;
        },
      }),
      fetchPokemonsFallback: builder.query<Pokemon[], void>({
        query() {
          return `/data.json`;
        },
      }),
      getPokemon: builder.query<Pokemon, number>({
        query(id) {
          return `/pokemon/${id}`;
        },
      }),
    };
  },
});

export const { useFetchPokemonsQuery, useFetchPokemonsFallbackQuery, useGetPokemonQuery } = apiSlice;
