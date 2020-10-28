import { AxiosResponse } from "axios";

export interface SendRecoverPasswordRequestData {
  email: string;
}

export type UseSendRecoverPasswordRequestPayload = (
  data: SendRecoverPasswordRequestData
) => Promise<AxiosResponse<unknown>>;
