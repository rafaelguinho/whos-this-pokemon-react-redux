import { LevelGenerations, RangeGenerations, RangePokemons } from "./types";

const levelsGenerations: LevelGenerations[] = [
  { level: 1, generations: [1] },
  { level: 2, generations: [1, 2] },
  { level: 3, generations: [1, 2, 3, 4] },
  { level: 4, generations: [1, 2, 3, 4, 5, 6, 7] },
];

const rangesGenerations: RangeGenerations[] = [
  { generation: 1, init: 1, end: 151 },
  { generation: 2, init: 152, end: 251 },
  { generation: 3, init: 252, end: 386 },
  { generation: 4, init: 385, end: 493 },
  { generation: 5, init: 492, end: 649 },
  { generation: 6, init: 648, end: 721 },
  { generation: 7, init: 720, end: 809 },
];

export const getPokemonsRange = (level: number): RangePokemons => {
  const generations: number[] | undefined = levelsGenerations.find(
    (l) => l.level === level
  )?.generations;

  const filteredGenerations: RangeGenerations[] = rangesGenerations.filter(
    (x) => generations?.includes(x.generation)
  );

  const init: number = filteredGenerations[0].init;
  const end: number = filteredGenerations[filteredGenerations.length - 1].end;

  const result: RangePokemons = {
    init,
    end,
  };

  return result;
};

export const getRandonPokemonIndex = (init: number, end: number): number =>
  Math.floor(Math.random() * (end - init + 1)) + init;

export const getRandonPokemonIndexExcludeProposedPokemons = (
  init: number,
  end: number,
  proposedPokemonsIds: Array<number>
): number => {
  const index = getRandonPokemonIndex(init, end);

  if (proposedPokemonsIds.includes(index)) {
    return getRandonPokemonIndexExcludeProposedPokemons(
      init,
      end,
      proposedPokemonsIds
    );
  }

  return index;
};
