import { Session } from "shared/types/apiSchema";
import { MutationHookPayload } from "shared/types/mutations";

export interface SignInData {
  email: string;
  password: string;
}

export type UseSignInPayload = MutationHookPayload<Session, SignInData>;
