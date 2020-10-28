import { AxiosResponse } from "axios";

export interface SignInData {
  email: string;
  password: string;
}

export type UseSignInPayload = (data: SignInData) => Promise<AxiosResponse<unknown>>;
