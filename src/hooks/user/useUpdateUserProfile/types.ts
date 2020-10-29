import { User } from "shared/types/apiSchema";
import { MutationHookPayload } from "shared/types/mutations";

export interface UpdateUserProfileData {
  name: string;
  email: string;
  password?: string;
  old_password?: string;
  password_confirmation?: string;
}

export type UseUpdateUserProfilePayload = MutationHookPayload<User, UpdateUserProfileData>
