import { ImgHTMLAttributes } from "react";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement>{
  src?: string;
  fallbackSrc: string;
}
