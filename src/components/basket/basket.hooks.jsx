import { useCallback, useEffect, useState } from "react";

export const useHash = () => {
  const [hash, setHash] = useState(() => window.location.hash);

  const hashChangeHandler = useCallback(() => {
    setHash(window.location.hash);
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", hashChangeHandler);
    return () => {
      window.removeEventListener("hashchange", hashChangeHandler);
    };
  }, []);

  const updateHash = useCallback(
    newHash => {
      if (newHash !== hash) window.location.hash = newHash;
    },
    [hash]
  );

  return [hash, updateHash];
};

export const useHistory = () => {
  const [state, setState] = useState(() => window.history.state);

  const stateChangeHandler = useCallback(() => {
    setState(window.history.state);
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", stateChangeHandler);
    return () => {
      window.removeEventListener("popstate", stateChangeHandler);
    };
  }, []);

  const updateHash = useCallback(
    newHash => {
      if (newHash !== state) window.history.pushState({}, "", newHash);
    },
    [state]
  );

  return [state, updateHash];
};
