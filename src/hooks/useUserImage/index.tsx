import { useImage } from "react-image";

import { User } from "contexts/auth/types";

/**
 * Returns the image source of a user, dealing with fallback and placeholders.
 *
 * @param user The user data
 */
const useUserImage = (user: User): string | undefined => {
  const { src: avatarUrl } = useImage({
    srcList: [user?.avatar_url, `https://via.placeholder.com/300/F18A07/FFFFFF?text=${user?.name}`],
    useSuspense: false,
  });

  return avatarUrl;
};

export default useUserImage;
