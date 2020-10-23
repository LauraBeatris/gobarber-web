import React from "react";

import getUserImagePlaceholder from "utils/getUserImagePlaceholder";

import { AvatarImage } from "./styles";
import { AvatarProps } from "./types";

const Avatar: React.FC<AvatarProps> = ({
  name,
  avatarUrl,
}) => (
  <AvatarImage
    src={avatarUrl}
    alt={name}
    title={name}
    aria-label={name}
    fallbackSrc={getUserImagePlaceholder(name)}
  />
);

export default Avatar;
