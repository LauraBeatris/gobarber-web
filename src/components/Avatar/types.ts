import { User } from "shared/types/apiSchema";

export interface AvatarProps {
  name: User["name"];
  avatarUrl: User["avatar_url"];
}
