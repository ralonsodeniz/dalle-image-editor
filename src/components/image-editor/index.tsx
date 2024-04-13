"use client";

import { useState, useRef } from "react";
import { ImageIcon } from "@radix-ui/react-icons";
import {
  FixedCropper,
  type FixedCropperRef,
  ImageRestriction,
  type Coordinates,
  CropperRef,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import { Toolbar } from "@/components/toolbar";
import ImageSelector from "@/components/image-selector";

export const ImageEditor = () => {
  const cropperRef = useRef<FixedCropperRef>(null);
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<"crop" | "generate">("crop");
  const [selectionRect, setSelectionRect] = useState<Coordinates | null>(null);
  const fileUrl = file ? URL.createObjectURL(file) : "";
  const isGenerateMode = mode === "generate";

  const handleCrop = () => {
    const canvas = cropperRef.current?.getCanvas({
      height: 640,
      width: 640,
    });

    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const croppedfile = new File([blob], "cropped-image", {
        type: blob.type,
      });
      setFile(croppedfile);
      setMode("generate");
    });
  };

  const handleSelectionChange = (cropper: CropperRef) =>
    setSelectionRect(cropper.getCoordinates());

  const imageToRender = isGenerateMode ? (
    <ImageSelector
      fileUrl={fileUrl}
      selectionRect={selectionRect}
      onSelectionChange={handleSelectionChange}
    />
  ) : (
    <FixedCropper
      className="h-[640px]"
      imageRestriction={ImageRestriction.stencil}
      ref={cropperRef}
      src={fileUrl}
      stencilProps={{
        movable: false,
        resizable: false,
        lines: false,
        handlers: false,
      }}
      stencilSize={{ width: 640, height: 640 }}
    />
  );

  return (
    <div className="flex flex-col gap-y-4">
      <div
        className={
          "w-[750px] h-[750px] relative shadow-sm rounded-md border bg-background flex items-center justify-center"
        }
      >
        {file ? imageToRender : <ImageIcon className="w-20 h-20" />}
      </div>
      <Toolbar
        file={file}
        isGenerateMode={isGenerateMode}
        onCrop={handleCrop}
        selectionRect={selectionRect}
        setFile={setFile}
        setMode={setMode}
      />
    </div>
  );
};
