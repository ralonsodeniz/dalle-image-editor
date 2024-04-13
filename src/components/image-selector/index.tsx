"use client";

import { Cropper, CropperRef, Coordinates } from "react-advanced-cropper";
import { defaultCoordinates } from "@/components/image-selector/utils";

interface Props {
  fileUrl: string;
  selectionRect?: Coordinates | null;
  onSelectionChange: (cropper: CropperRef) => void;
}

const ImageSelector = ({
  fileUrl,
  selectionRect,
  onSelectionChange,
}: Props) => (
  <Cropper
    src={fileUrl}
    className={"h-[640px]"}
    stencilProps={{
      overlayClassName: "cropper-overlay",
    }}
    backgroundWrapperProps={{
      scaleImage: false,
      moveImage: false,
    }}
    defaultCoordinates={defaultCoordinates(selectionRect)}
    onChange={onSelectionChange}
  />
);

export default ImageSelector;
