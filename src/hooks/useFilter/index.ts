import { useCallback, useMemo } from "react";
import { UrlUpdateType, useQueryParam } from "use-query-params";

import { Filter, UseFilterResult } from "./types";

/**
 * Exposes the useQueryParam hook to apply filters
 *
 * @param filter The filter.
 */
const useFilter = <T>(
  filterObject: Filter,
  updateType: UrlUpdateType = "replaceIn",
): UseFilterResult<T> => {
  const [filter, setFilter] = useQueryParam(filterObject.name, filterObject.type);

  const handleSetFilter = useCallback((value: unknown) => {
    setFilter(value, updateType);
  }, [setFilter, updateType]);

  const payload = useMemo<UseFilterResult<T>>(() => [
    filter,
    handleSetFilter,
  ], [
    filter,
    handleSetFilter,
  ]);

  return payload;
};

export default useFilter;
