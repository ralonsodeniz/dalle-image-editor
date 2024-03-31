"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "@radix-ui/react-icons";
import { Toolbar } from "@/components/toolbar";

export const ImageEditor = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileUrl = file ? URL.createObjectURL(file) : "";

  return (
    <div className="flex flex-col gap-y-4">
      <div
        className={
          "w-[500px] h-[500px] relative shadow-sm rounded-md border bg-background flex items-center justify-center"
        }
      >
        {file ? (
          <Image
            alt="image-to-edit"
            fill
            sizes={"66vw"}
            src={fileUrl}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <ImageIcon className="w-20 h-20" />
        )}
      </div>
      <Toolbar file={file} setFile={setFile} />
    </div>
  );
};
