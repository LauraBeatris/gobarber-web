/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { MutateFunction } from "react-query";

export type MutationHookPayload<TResult = any, TVariables = any> = [
  mutate: MutateFunction<TResult, AxiosError<any>, TVariables>,
  isLoading: boolean,
]
