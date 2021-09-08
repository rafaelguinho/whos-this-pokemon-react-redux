import { PayloadAction } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { fetchPokemonById } from "../../actions/api-actions";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getRandonPokemonIndex } from "../../configurations/level-generations-config";
import { Pokemon } from "../../features/game/types";
import { useFetchPokemonsNamesQuery } from "../../features/pokemons/pokemons-names-slice";
import useCountDownTimer from "../../hooks/countDown";
import { capitalize, shuffle } from "../../util/util";
import PokemonDraw from "./PokemonDraw";

const PokemonGame: React.FC = () => {
  const dispatch = useAppDispatch();

  const [shouldSelectNewProkemon, setShouldSelectNewProkemon] =
    useState<boolean>(true);

  const [sortedPokemonIndex, setSortedPokemonIndex] = useState<number | null>(
    null
  );

  const { timeLeft, timesUp } = useCountDownTimer(8);

  const { data: allPokemonsNames } = useFetchPokemonsNamesQuery();

  const { init, end } = useAppSelector(
    (state) => state.game.levelConfigurations
  );

  useEffect(() => {
    if (shouldSelectNewProkemon && allPokemonsNames) {
      const sortedPokemonIndex: number = getRandonPokemonIndex(init, end);

      setSortedPokemonIndex(sortedPokemonIndex);
      setShouldSelectNewProkemon(false);

      const promise: Promise<PayloadAction<any, string>> = dispatch(
        fetchPokemonById(sortedPokemonIndex)
      );

      promise
        .then((result) => {
          console.log(result.payload);

          const pokemon = result.payload as Pokemon;

          const allNames: string[] = allPokemonsNames?.map((x) => x.name) ?? [];

          const options: string[] = createOptions(pokemon, allNames);

          console.log(pokemon.name, options);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [shouldSelectNewProkemon, allPokemonsNames, dispatch, init, end]);

  const createOptions = (pokemon: Pokemon, allNames: string[]): string[] => {
    const index1: number = getRandonPokemonIndex(0, allNames.length);
    let index2: number = getRandonPokemonIndex(0, allNames.length);

    while (index1 === index2) {
      index2 = getRandonPokemonIndex(0, allNames.length);
    }

    let options: string[] = [
      capitalize(allNames[index1]),
      capitalize(allNames[index2]),
      capitalize(pokemon.name),
    ];

    return shuffle(options);
  };

  return (
    <>
      <p>{timesUp ? "acabou" : "ainda tem"}</p>
      <progress id="file" value={timeLeft} max="8"></progress>
      <PokemonDraw
        selectedPokemonId={sortedPokemonIndex}
        drawSilhouette={true}
      />
      <button onClick={(e) => setShouldSelectNewProkemon(true)}>New</button>
    </>
  );
};

export default PokemonGame;
