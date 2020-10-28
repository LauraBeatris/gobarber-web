import { AxiosResponse } from "axios";

export interface ResetPasswordData {
  token: string;
  password: string;
  confirm_password: string;
}

export type UseResetPasswordPayload = (data: ResetPasswordData) => Promise<AxiosResponse<unknown>>;
