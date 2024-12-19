import { useState, useEffect } from "react";

/**
 * This custom hook helps fix hydration issues when using persisted state with localStorage
 * 
 * It takes two parameters:
 * @param store - A store selector function that accepts a callback to access state
 * @param callback - A function that extracts specific data from the store state
 * 
 * The hook works by:
 * 1. Getting initial data from the store using the callback
 * 2. Maintaining local state to handle hydration
 * 3. Syncing the local state with store updates via useEffect
 * 
 * This prevents hydration mismatches between server and client when using
 * persisted state stored in localStorage.
 * 
 * @returns The extracted store data after handling hydration
 */
export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};