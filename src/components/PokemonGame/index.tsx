import { PayloadAction } from "@reduxjs/toolkit";
import React, { useEffect, useReducer, useCallback } from "react";
import { useHistory } from "react-router";
import { fetchPokemonById } from "../../actions/api-actions";
import {
  AppContainer,
  ButtonBottomContainer,
  GameInfoBar,
} from "../../app-styles";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getRandonPokemonIndex,
  getRandonPokemonIndexExcludeProposedPokemons,
} from "../../configurations/level-generations-config";
import {
  addPoint,
  addProposedPokemon,
  gameStated,
  lostALife,
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
import Button from "../Button/styles";
import LifesPanel from "../LifesPanel";
import ScorePanel from "../ScorePanel";
import PokemonDraw from "./PokemonDraw";
import PokemonOptions from "./PokemonOptions";
import { PokemonOption } from "./types";

const PokemonGame: React.FC = () => {
  let history = useHistory();
  const [state, reducerDispatch] = useReducer(reducer, initialState);

  const reduxDispacher = useAppDispatch();

  const { timeLeft, timesUp, stopCountDown, startRestartCountDown } =
    useCountDownTimer(8);

  const { data: allPokemonsNames } = useFetchPokemonsNamesQuery();

  const levelConfigurations = useAppSelector(
    (state) => state.game.levelConfigurations
  );

  const canStartNewGame = useAppSelector((state) => state.game.canStartNewGame);
  const gameStarted = useAppSelector((state) => state.game.gameStarted);

  const gameIsOver = useAppSelector((state) => state.game.gameIsOver);
  const gameBeat = useAppSelector((state) => state.game.gameBeat);
  const isTheLastRound = useAppSelector((state) => state.game.isTheLastRound);

  const proposedPokemons = useAppSelector(
    (state) => state.game.proposedPokemons
  );

  const isRightAnswer = state.isRightAnswer;

  const selectNewProkemon =
    state.selectNewProkemon && !gameIsOver && !isTheLastRound;

  const canStartCountDown =
    state.canStartCountDown && !gameIsOver && !isTheLastRound;

  const canSelectNextProkemon =
    state.canSelectNextProkemon && !gameIsOver && !isTheLastRound;

  useEffect(() => {
    if (canStartNewGame) {
      reduxDispacher(gameStated());
    }
  }, [canStartNewGame, reduxDispacher]);

  useEffect(() => {
    if (!levelConfigurations) {
      history.push("/");
    }
  }, [levelConfigurations, history]);

  useEffect(() => {
    if (gameIsOver) {
      history.push("/game-over");
    }
  }, [gameIsOver, history]);

  useEffect(() => {
    if (gameBeat) {
      history.push("/game-beat");
    }
  }, [gameBeat, history]);

  useEffect(() => {
    if (timesUp) {
      reducerDispatch({
        type: PokemonGameActionKind.END_CURRENT_QUIZ,
        payload: null,
      });
    }
  }, [timesUp]);

  useEffect(() => {
    if (timesUp && gameStarted) {
      reduxDispacher(lostALife());
    }
  }, [timesUp, gameStarted, reduxDispacher]);

  useEffect(() => {
    if (canStartCountDown) {
      reducerDispatch({
        type: PokemonGameActionKind.STARTED_COUNT_DOWN,
        payload: null,
      });

      startRestartCountDown();
    }
  }, [canStartCountDown, startRestartCountDown]);

  useEffect(() => {
    if (selectNewProkemon && allPokemonsNames && levelConfigurations) {
      reducerDispatch({
        type: PokemonGameActionKind.LOADING_NEW_POKEMON,
        payload: null,
      });

      const proposedPokemonsIds: Array<number> = proposedPokemons.map(
        (p) => p.id
      );
      const sortedPokemonIndex: number =
        getRandonPokemonIndexExcludeProposedPokemons(
          levelConfigurations?.init,
          levelConfigurations?.end,
          proposedPokemonsIds
        );

      const promise: Promise<PayloadAction<any, string>> = reduxDispacher(
        fetchPokemonById(sortedPokemonIndex)
      );

      promise
        .then((result) => {
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

          reduxDispacher(addProposedPokemon(pokemon));
        })
        .catch((error) => {
          console.error(error);

          const pokemon = allPokemonsNames.find(
            (n) => n.id === sortedPokemonIndex
          ) as Pokemon;

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

          reduxDispacher(addProposedPokemon(pokemon));
        });
    }
  }, [
    selectNewProkemon,
    allPokemonsNames,
    reducerDispatch,
    reduxDispacher,
    levelConfigurations,
    proposedPokemons,
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
      isRightAnswer = true;

      reduxDispacher(addPoint());
    } else {
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

  const startCountDown = useCallback(() => {
    reducerDispatch({
      type: PokemonGameActionKind.START_COUNT_DOWN,
      payload: null,
    });
  }, []);

  return (
    <>
      <AppContainer>
        <GameInfoBar>
          <ScorePanel />
          <progress id="file" value={timeLeft} max="8"></progress>
          <LifesPanel />
        </GameInfoBar>

        <PokemonDraw
          selectedPokemonId={state.currentPokemon?.id}
          drawSilhouette={!isRightAnswer}
          actionAfterDrawSilhouette={startCountDown}
        />

        <PokemonOptions
          options={state.currentOptions}
          wrongOptionSelected={isRightAnswer != null && isRightAnswer === false}
          isActive={!state.endQuiz}
          optionsClickAction={checkAnswer}
        />
        <ButtonBottomContainer>
          <Button
            show={canSelectNextProkemon}
            onClick={(e) =>
              reducerDispatch({
                type: PokemonGameActionKind.SELECT_NEW_POKEMON,
                payload: null,
              })
            }
          >
            Next
          </Button>
        </ButtonBottomContainer>
      </AppContainer>
    </>
  );
};

export default PokemonGame;
