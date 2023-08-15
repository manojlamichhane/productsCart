import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <Image
      src="/Loading_icon.gif"
      alt="loading"
      width={450}
      height={450}
      className="object-contain w-auto h-auto"
    />
  );
};

export default Loading;
