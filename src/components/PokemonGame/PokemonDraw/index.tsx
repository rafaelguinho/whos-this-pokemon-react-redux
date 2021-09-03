import React, { useEffect } from "react";
import { ImageDesigner } from "../../../models/imageDesigner";
import { PokemonDrawProps } from "./types";

const PokemonDraw: React.FC<PokemonDrawProps> = ({
  selectedPokemonId,
  drawSilhouette,
}: PokemonDrawProps) => {
  const imageBaseUrl =
    "assets/img/pokemons";

  useEffect(() => {
      
    const imageUrl = `${imageBaseUrl}/${String(selectedPokemonId)}.png`;

    const canvas: HTMLCanvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;

    const imageDesigner = new ImageDesigner(imageUrl, canvas);

    if (drawSilhouette) {
      imageDesigner.drawSilhouette();
    } else {
      imageDesigner.drawImage();
    }
  }, [selectedPokemonId, drawSilhouette]);

  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  );
};

export default PokemonDraw;
