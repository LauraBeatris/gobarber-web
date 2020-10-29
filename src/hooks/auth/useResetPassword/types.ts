import { User } from "shared/types/apiSchema";
import { MutationHookPayload } from "shared/types/mutations";

export interface ResetPasswordData {
  token: string;
  password: string;
  confirm_password: string;
}

export type UseResetPasswordPayload = MutationHookPayload<User, ResetPasswordData>;

