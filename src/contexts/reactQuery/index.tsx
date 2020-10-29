/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo } from "react";
import { ReactQueryCacheProvider, QueryCache } from "react-query";

import { useToastsDispatch } from "contexts/toasts/ToastsContext";

const ReactQueryProvider: React.FC = ({ children }) => {
  const { addToast } = useToastsDispatch();

  const handleMutationAndQueryError = useCallback((error: any) => {
    const isCancelledError = error && error.constructor.name !== "CancelledError";

    if (isCancelledError) {
      return;
    }

    addToast({
      title: error.response?.data.message,
      type: "error",
    });
  }, [addToast]);

  const queryCache = useMemo(() => (
    new QueryCache({
      defaultConfig: {
        queries: {
          onError: handleMutationAndQueryError,
        },
        mutations: {
          onError: handleMutationAndQueryError,
          throwOnError: true,
        },
      },
    })
  ), [handleMutationAndQueryError]);

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      {children}
    </ReactQueryCacheProvider>
  );
};

export default ReactQueryProvider;
