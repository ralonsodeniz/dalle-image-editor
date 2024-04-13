import type { Coordinates } from "react-advanced-cropper";

export const getCanvasData = async (canvas: HTMLCanvasElement | null) => {
  return new Promise((resolve, reject) => {
    canvas?.toBlob(resolve);
  });
};

const drawImage = (canvas: HTMLCanvasElement | null, src: string) => {
  const context = canvas?.getContext("2d");
  if (!context || !canvas) return;

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;
    image.onload = () => {
      const { width, height } = image;
      canvas.width = width;
      canvas.height = height;
      context.drawImage(image, 0, 0, width, height);

      resolve(context);
    };
  });
};

const drawMask = (
  canvas: HTMLCanvasElement | null,
  rectangle: Coordinates | null,
) => {
  const context = canvas?.getContext("2d");
  if (!context || !rectangle) return;

  context.globalCompositeOperation = "destination-out";
  context.fillRect(
    rectangle.left,
    rectangle.top,
    rectangle.width,
    rectangle.height,
  );
};

export const getImageData = async (fileUrl: string) => {
  const canvas = document.createElement("canvas");
  await drawImage(canvas, fileUrl);
  return getCanvasData(canvas);
};

export const getMaskData = async (
  fileUrl: string,
  rectangle: Coordinates | null,
) => {
  const canvas = document.createElement("canvas");
  await drawImage(canvas, fileUrl);
  drawMask(canvas, rectangle);
  return getCanvasData(canvas);
};
