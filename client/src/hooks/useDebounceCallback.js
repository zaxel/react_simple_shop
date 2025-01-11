import { useCallback, useEffect, useRef } from "react";

export const useDebounceCallback = (callback, delay) => {
  const timerRef = useRef(null);

  const debouncedFunction = useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => () => clearTimeout(timerRef.current),[]);

  debouncedFunction.cancel = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return debouncedFunction;
};
