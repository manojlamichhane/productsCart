import { IconButtonProps } from "@/types";
import Image from "next/image";
import React from "react";

const IconButton = ({
  source,
  handleClick,
  styles,
  width,
  height,
}: IconButtonProps) => {
  return (
    <button onClick={handleClick}>
      <Image
        src={source}
        alt="add"
        width={width || 10}
        height={height || 10}
        className={`object-contain rounded-2xl m-2 ${styles}`}
      />
    </button>
  );
};

export default IconButton;
