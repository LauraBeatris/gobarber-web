import { AxiosResponse } from "axios";

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export type UseSignUpPayload = (data: SignUpData) => Promise<AxiosResponse<unknown>>;
