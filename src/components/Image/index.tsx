import React from "react";
import { useImage } from "react-image";

import { ImageProps } from "./types";

/**
 * Reusable image component that handles a fallback
 * if the original source is falsy or invalid
 */
const Image: React.FC<ImageProps> = ({
  src,
  fallbackSrc,
  ...rest
}) => {
  const { src: imageSource } = useImage({
    srcList: [src ?? fallbackSrc, fallbackSrc ?? ""],
    useSuspense: false,
  });

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img src={imageSource || src} {...rest} />
  );
};

export default Image;
