import { PayloadAction } from "@reduxjs/toolkit";
import React, { useEffect, useState, useReducer } from "react";
import { fetchPokemonById } from "../../actions/api-actions";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getRandonPokemonIndex } from "../../configurations/level-generations-config";
import {
  addPoint,
  lostALife,
  setCurrentPokemon,
} from "../../features/game/game-slice";
import { Pokemon } from "../../features/game/types";
import { useFetchPokemonsNamesQuery } from "../../features/pokemons/pokemons-names-slice";
import useCountDownTimer from "../../hooks/countDown";
import reducer, {
  PokemonGameActionKind,
} from "../../reducers/pokemonGameReducer";
import initialState from "../../reducers/pokemonGameReducerInitialState";
import { PokemonGameReducerState } from "../../reducers/types";
import { capitalize, shuffle } from "../../util/util";
import PokemonDraw from "./PokemonDraw";
import PokemonOptions from "./PokemonOptions";
import { PokemonOption } from "./types";

const PokemonGame: React.FC = () => {
  const [state, reducerDispatch] = useReducer(reducer, initialState);

  const reduxDispacher = useAppDispatch();

  const [shouldSelectNewProkemon, setShouldSelectNewProkemon] =
    useState<boolean>(true);

  const [sortedPokemonIndex, setSortedPokemonIndex] = useState<number | null>(
    null
  );

  const [pokemonsOptions, setPokemonsOptions] = useState<
    PokemonOption[] | null
  >(null);

  const { timeLeft, timesUp, restartCountDown } = useCountDownTimer(8);

  const { data: allPokemonsNames } = useFetchPokemonsNamesQuery();

  const { init, end } = useAppSelector(
    (state) => state.game.levelConfigurations
  );

  const currentPokemon = useAppSelector((state) => state.game.currentPokemon);

  useEffect(() => {
    if (shouldSelectNewProkemon) {
      restartCountDown();
    }
  }, [shouldSelectNewProkemon, restartCountDown]);

  useEffect(() => {
    if (shouldSelectNewProkemon && allPokemonsNames) {
      const sortedPokemonIndex: number = getRandonPokemonIndex(init, end);

      setSortedPokemonIndex(sortedPokemonIndex);
      setShouldSelectNewProkemon(false);

      const promise: Promise<PayloadAction<any, string>> = reduxDispacher(
        fetchPokemonById(sortedPokemonIndex)
      );

      promise
        .then((result) => {
          console.log(result.payload);

          const pokemon = result.payload as Pokemon;

          const options: PokemonOption[] = createOptions(
            pokemon,
            allPokemonsNames
          );

          reducerDispatch({
            type: PokemonGameActionKind.SET_OPTIONS_AND_CURRENT_POKEMON,
            payload: {
              currentOptions: options,
              currentPokemon: pokemon,
            } as PokemonGameReducerState,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [shouldSelectNewProkemon, allPokemonsNames, reducerDispatch, init, end]);

  const createOptions = (
    pokemon: Pokemon,
    allPokemonsNames: Pokemon[]
  ): PokemonOption[] => {
    const index1: number = getRandonPokemonIndex(0, allPokemonsNames.length);
    let index2: number = getRandonPokemonIndex(0, allPokemonsNames.length);

    while (index1 === index2) {
      index2 = getRandonPokemonIndex(0, allPokemonsNames.length);
    }

    let options: PokemonOption[] = [
      {
        id: allPokemonsNames[index1].id,
        name: capitalize(allPokemonsNames[index1].name),
      },
      {
        id: allPokemonsNames[index2].id,
        name: capitalize(allPokemonsNames[index2].name),
      },
      { id: pokemon.id, name: capitalize(pokemon.name) },
    ];

    return shuffle(options);
  };

  const checkAnswer = (selectedOption: PokemonOption): void => {
    if (selectedOption.id === currentPokemon?.id) {
      console.log("right answer");

      reducerDispatch({
        type: PokemonGameActionKind.SET_ANSWER,
        payload: {
          isRightAnswer: true,
          currentPokemon: selectedOption,
        } as PokemonGameReducerState,
      });

      reduxDispacher(addPoint());
    } else {
      console.log("wrong answer");

      reducerDispatch({
        type: PokemonGameActionKind.SET_ANSWER,
        payload: {
          isRightAnswer: false,
          currentPokemon: selectedOption,
        } as PokemonGameReducerState,
      });

      reduxDispacher(lostALife());
    }
  };

  return (
    <>
      <p>{timesUp ? "acabou" : "ainda tem"}</p>
      <progress id="file" value={timeLeft} max="8"></progress>
      <PokemonDraw
        selectedPokemonId={sortedPokemonIndex}
        drawSilhouette={true}
      />

      <PokemonOptions
        options={pokemonsOptions}
        isActive={!timesUp}
        optionsClickAction={checkAnswer}
      />
      <button onClick={(e) => setShouldSelectNewProkemon(true)}>New</button>
    </>
  );
};

export default PokemonGame;
