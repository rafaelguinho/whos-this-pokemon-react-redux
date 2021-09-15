import { PayloadAction } from "@reduxjs/toolkit";
import React, { useEffect, useReducer } from "react";
import { fetchPokemonById } from "../../actions/api-actions";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getRandonPokemonIndex } from "../../configurations/level-generations-config";
import { addPoint, lostALife } from "../../features/game/game-slice";
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

  const { timeLeft, timesUp, stopCountDown, startRestartCountDown } =
    useCountDownTimer(8);

  const { data: allPokemonsNames } = useFetchPokemonsNamesQuery();

  const { init, end } = useAppSelector(
    (state) => state.game.levelConfigurations
  );

  const gameIsOver = useAppSelector((state) => state.game.gameIsOver);
  const score = useAppSelector((state) => state.game.score);
  const lifes = useAppSelector((state) => state.game.lifes);

  const isRightAnswer = state.isRightAnswer;

  const selectNewProkemon = state.selectNewProkemon && !gameIsOver;

  const canSelectNextProkemon = state.canSelectNextProkemon && !gameIsOver;

  useEffect(() => {
    if (timesUp) {
      reducerDispatch({
        type: PokemonGameActionKind.END_QUIZ,
        payload: null,
      });
    }
  }, [timesUp]);

  useEffect(() => {
    if (timesUp && !isRightAnswer) {
      reduxDispacher(lostALife());
    }
  }, [timesUp, isRightAnswer]);

  useEffect(() => {
    if (selectNewProkemon) {
      startRestartCountDown();
    }
  }, [selectNewProkemon, startRestartCountDown]);

  useEffect(() => {
    if (selectNewProkemon && allPokemonsNames) {
      reducerDispatch({
        type: PokemonGameActionKind.NOT_SELECT_NEW_POKEMON,
        payload: null,
      });

      const sortedPokemonIndex: number = getRandonPokemonIndex(init, end);

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
  }, [
    selectNewProkemon,
    allPokemonsNames,
    reducerDispatch,
    reduxDispacher,
    init,
    end,
  ]);

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
    stopCountDown();

    let isRightAnswer: boolean = false;
    if (selectedOption.id === state.currentPokemon?.id) {
      console.log("right answer");

      isRightAnswer = true;

      reduxDispacher(addPoint());
    } else {
      console.log("wrong answer");

      isRightAnswer = false;

      reduxDispacher(lostALife());
    }

    reducerDispatch({
      type: PokemonGameActionKind.SET_ANSWER,
      payload: {
        isRightAnswer,
        currentPokemon: selectedOption,
      } as PokemonGameReducerState,
    });
  };

  return (
    <>
      <p>
        {score} / {lifes}
      </p>
      <progress id="file" value={timeLeft} max="8"></progress>
      <PokemonDraw
        selectedPokemonId={state.currentPokemon?.id}
        drawSilhouette={!isRightAnswer}
      />

      <PokemonOptions
        options={state.currentOptions}
        isActive={!state.endQuiz}
        optionsClickAction={checkAnswer}
      />
      {canSelectNextProkemon ? (
        <button
          onClick={(e) =>
            reducerDispatch({
              type: PokemonGameActionKind.SELECT_NEW_POKEMON,
              payload: null,
            })
          }
        >
          New
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default PokemonGame;
