import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Pokemon } from "../game/types";

export const pokemonsNamesSlice = createApi({
  reducerPath: "pokemons-names",
  baseQuery: fetchBaseQuery({
    baseUrl: "../../data",
  }),
  endpoints(builder) {
    return {
      fetchPokemonsNames: builder.query<Pokemon[], void>({
        query() {
          return `/data.json`;
        },
      }),
    };
  },
});

export const { useFetchPokemonsNamesQuery } = pokemonsNamesSlice;
