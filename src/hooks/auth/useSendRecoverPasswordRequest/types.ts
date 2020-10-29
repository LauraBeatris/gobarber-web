import { MutationHookPayload } from "shared/types/mutations";

export interface SendRecoverPasswordRequestData {
  email: string;
}

export type UseSendRecoverPasswordRequestPayload = MutationHookPayload<
  unknown, SendRecoverPasswordRequestData
>;
