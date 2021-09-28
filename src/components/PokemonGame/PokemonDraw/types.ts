export interface PokemonDrawProps {
  selectedPokemonId: number | null | undefined;
  drawSilhouette: boolean;
  actionAfterDrawSilhouette: Function;
  actionAfterDrawImage?: Function | null | undefined;
}
