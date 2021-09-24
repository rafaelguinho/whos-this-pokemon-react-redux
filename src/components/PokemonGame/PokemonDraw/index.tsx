import React, { useEffect } from "react";
import { ImageDesigner } from "../../../models/imageDesigner";
import { PokemonDrawProps } from "./types";

const PokemonDraw: React.FC<PokemonDrawProps> = ({
  selectedPokemonId,
  drawSilhouette,
  actionAfterDraw,
}: PokemonDrawProps) => {
  const imageBaseUrl = "assets/img/pokemons";

  useEffect(() => {
    if (!selectedPokemonId) return;

    async function draw() {
      const imageUrl = `${imageBaseUrl}/${String(selectedPokemonId)}.png`;

      const canvas: HTMLCanvasElement = document.getElementById(
        "canvas"
      ) as HTMLCanvasElement;

      const imageDesigner = new ImageDesigner(imageUrl, canvas);

      if (drawSilhouette) {
        await imageDesigner.drawSilhouette();
      } else {
        await imageDesigner.drawImage();
      }

      actionAfterDraw();
    }

    draw();
  }, [selectedPokemonId, drawSilhouette]);

  if (!selectedPokemonId) return <></>;

  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  );
};

export default PokemonDraw;
