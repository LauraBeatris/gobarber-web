import { User } from "shared/types/apiSchema";

/**
 * Returns the placeholder image URL for users
 *
 * @param username The user name
 */
const getUserImagePlaceholder = (username: User["name"]): string => (
  `https://via.placeholder.com/300/F18A07/FFFFFF?text=${username}`
);

export default getUserImagePlaceholder;
