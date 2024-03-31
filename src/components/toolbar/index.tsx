"use client";

import { useRef } from "react";
import {
  CircleBackslashIcon,
  DownloadIcon,
  UploadIcon,
} from "@radix-ui/react-icons";

import { Menubar } from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";

export const Toolbar = ({
  file,
  setFile,
}: {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const fileUrl = file ? URL.createObjectURL(file) : "";

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files || [];
    if (!file) return;
    setFile(file);
  };

  return (
    <Menubar className="w-fit h-auto p-1">
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
        size={"icon"}
        variant={"ghost"}
        disabled={!file}
        onClick={() => setFile(null)}
      >
        <CircleBackslashIcon />
      </Button>
    </Menubar>
  );
};
