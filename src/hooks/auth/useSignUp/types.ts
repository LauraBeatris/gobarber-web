import { User } from "shared/types/apiSchema";
import { MutationHookPayload } from "shared/types/mutations";

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export type UseSignUpPayload = MutationHookPayload<Partial<User>, SignUpData>;
