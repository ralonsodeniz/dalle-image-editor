"use client";

import { useRef } from "react";
import {
  CircleBackslashIcon,
  DownloadIcon,
  ScissorsIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import type { Coordinates } from "react-advanced-cropper";

import { Menubar } from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import GeneratePrompt from "@/components/generate-prompt";
import { getImageData, getMaskData } from "@/components/image-editor/utils";
import { sendDalleRequest } from "@/actions";

type Props = {
  file: File | null;
  isGenerateMode: boolean;
  onCrop: () => void;
  selectionRect: Coordinates | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setMode: React.Dispatch<React.SetStateAction<"crop" | "generate">>;
};

export const Toolbar = ({
  file,
  isGenerateMode,
  onCrop,
  selectionRect,
  setFile,
  setMode,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const fileUrl = file ? URL.createObjectURL(file) : "";

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files || [];
    if (!file) return;
    setFile(file);
    setMode("crop");
  };

  const handleFormSubmit = async (formData: FormData) => {
    const image = await getImageData(fileUrl);
    const mask = await getMaskData(fileUrl, selectionRect);
    formData.append("image", image as Blob);
    formData.append("mask", mask as Blob);
    formData.append("response_format", "b64_json");
    const dalleImage = await sendDalleRequest(formData);
    console.log("dalleImage", dalleImage);
  };

  return (
    <Menubar className="h-auto p-1">
      <Button
        onClick={() => inputRef.current?.click()}
        size="icon"
        variant="ghost"
      >
        <UploadIcon />
        <input
          accept="image/*"
          className="hidden"
          multiple={false}
          onChange={handleUploadFile}
          ref={inputRef}
          type="file"
          value=""
        />
      </Button>
      <Button
        disabled={!file || isGenerateMode}
        onClick={onCrop}
        size="icon"
        variant="ghost"
      >
        <ScissorsIcon />
      </Button>
      <form action={handleFormSubmit} className="flex w-full">
        <GeneratePrompt disabled={!isGenerateMode || !file} />
      </form>
      <Button
        size="icon"
        variant="ghost"
        disabled={!file}
        onClick={() => anchorRef.current?.click()}
      >
        <DownloadIcon />
        <a
          href={fileUrl}
          download={file?.name}
          className={"hidden"}
          ref={anchorRef}
        />
      </Button>
      <Button
        disabled={!file}
        onClick={() => setFile(null)}
        size="icon"
        variant="ghost"
      >
        <CircleBackslashIcon />
      </Button>
    </Menubar>
  );
};
