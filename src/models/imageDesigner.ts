import { ImageDrawnData } from "./types";

export class ImageDesigner {
  constructor(private _imageUrl: string, private _canvas: HTMLCanvasElement) {}

  async drawImage(): Promise<void> {
    const imageDrawnData: ImageDrawnData = await this.drawImageAndReturnData(
      this._imageUrl,
      this._canvas
    );
    imageDrawnData.context?.drawImage(
      imageDrawnData.image,
      0,
      0,
      imageDrawnData.newImgWidth,
      imageDrawnData.newImgHeight
    );
  }

  async drawSilhouette(): Promise<void> {
    const imageDrawnData: ImageDrawnData = await this.drawImageAndReturnData(
      this._imageUrl,
      this._canvas
    );

    imageDrawnData.context?.drawImage(
      imageDrawnData.image,
      0,
      0,
      imageDrawnData.newImgWidth,
      imageDrawnData.newImgHeight
    );

    let rawImage: ImageData | undefined = imageDrawnData.context?.getImageData(
      0,
      0,
      imageDrawnData.newImgWidth,
      imageDrawnData.newImgHeight
    );

    if (!rawImage) return;

    for (var i = 0; i < rawImage.data.length; i += 4) {
      if (rawImage.data[i + 3] >= 100) {
        rawImage.data[i] = 30;
        rawImage.data[i + 1] = 30;
        rawImage.data[i + 2] = 30;
        rawImage.data[i + 3] = 255;
      } else {
        rawImage.data[i + 3] = 0;
      }
    }

    imageDrawnData.context?.putImageData(rawImage, 0, 0);
  }

  private async drawImageAndReturnData(
    _imageUrl: string,
    _canvas: HTMLCanvasElement
  ): Promise<ImageDrawnData> {

    const image: HTMLImageElement = await loadImage(this._imageUrl);

    const context: CanvasRenderingContext2D | null =
      this._canvas.getContext("2d");

    const newImgWidth: number = this._canvas.width;
    const newImgHeight: number = image.height * (newImgWidth / image.width);

    this._canvas.height = newImgHeight;

    const result: ImageDrawnData = {
      context,
      image,
      newImgHeight,
      newImgWidth,
    };

    return result;
  }
}

const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise<HTMLImageElement>((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
    return image;
  });
};
