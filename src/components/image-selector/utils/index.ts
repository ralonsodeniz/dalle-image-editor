import type { Coordinates, ImageSize } from "react-advanced-cropper";

export const defaultCoordinates =
  (selectionRect?: Coordinates | null) =>
  ({ imageSize }: { imageSize: ImageSize }) => {
    return (
      selectionRect || {
        top: imageSize.width * 0.1,
        left: imageSize.width * 0.1,
        width: imageSize.width * 0.8,
        height: imageSize.height * 0.8,
      }
    );
  };
