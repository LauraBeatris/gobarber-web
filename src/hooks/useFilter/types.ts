import { QueryParamConfig, UrlUpdateType } from "use-query-params";

export interface Filter {
  type: QueryParamConfig<any, any>;
  name: string;
}

export type SetFilter<T = undefined> = (filter?: T, updateType?: UrlUpdateType) => void;

export type UseFilterResult<T> = [
  filter: T,
  setFilter: SetFilter<T>
];
