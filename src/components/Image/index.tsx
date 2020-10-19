import React from "react";
import { useImage } from "react-image";

import { ImageProps } from "./types";

const Image: React.FC<ImageProps> = ({
  src,
  fallbackSrc,
  ...rest
}) => {
  const { src: imageSource } = useImage({
    srcList: [src, fallbackSrc ?? ""],
    useSuspense: false,
  });

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img src={imageSource || src} {...rest} />
  );
};

export default Image;
