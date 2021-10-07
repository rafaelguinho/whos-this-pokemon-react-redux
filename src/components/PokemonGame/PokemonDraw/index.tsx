import React, { useEffect } from "react";
import { ImageDesigner } from "../../../models/imageDesigner";
import { PokemonDrawProps } from "./types";

const PokemonDraw: React.FC<PokemonDrawProps> = ({
  selectedPokemonId,
  drawSilhouette,
  actionAfterDrawSilhouette,
  actionAfterDrawImage,
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
        actionAfterDrawSilhouette();
      } else {
        await imageDesigner.drawImage();

        if (actionAfterDrawImage) {
          actionAfterDrawImage();
        }
      }
    }

    draw();
  }, [
    selectedPokemonId,
    drawSilhouette,
    actionAfterDrawSilhouette,
    actionAfterDrawImage,
  ]);

  if (!selectedPokemonId) return <></>;

  return (
    <>
      <canvas id="canvas" height="300"></canvas>
    </>
  );
};

export default PokemonDraw;
