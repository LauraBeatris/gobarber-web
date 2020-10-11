import * as React from "react";

/**
 * The default delay to wait for.
 */
export const DEFAULT_DELAY_MS = 500;

/**
 * Adds a minimum delay time to a loading state, to prevent screen flickering.
 * For example, if the loading process takes 0.3s, it would take a total of 1s,
 * but if it takes 1.5s then the time would stay the same, 1.5s.
 * @param loading The original loading condition
 * @param delay The delay to await
 */
const useLoadingDelay = (loading: boolean, delay = DEFAULT_DELAY_MS): boolean => {
  const [isDelayCompleted, setIsDelayCompleted] = React.useState(delay <= 0);

  React.useEffect(() => {
    if (isDelayCompleted && loading) {
      setIsDelayCompleted(false);
    }

    setTimeout(() => {
      setIsDelayCompleted(true);
    }, delay);
  }, [
    isDelayCompleted,
    loading,
    delay,
  ]);

  if (!isDelayCompleted) {
    return true;
  }

  return loading;
};

export default useLoadingDelay;
