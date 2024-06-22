import { useCallback, useEffect, useState } from "react";

function useViewState(storageKey: string, initialView: string) {
  const [viewState, setViewState] = useState<string | null>(null);

  useEffect(() => {
    const storedView = localStorage.getItem(storageKey);
    if (storedView === null) {
      setViewState(initialView);
    } else {
      setViewState(storedView);
    }
  }, []);

  useEffect(() => {
    if (viewState) {
      localStorage.setItem(storageKey, viewState);
    }
  }, [viewState]);

  const handleCardViewClick = useCallback(() => {
    setViewState("card");
  }, []);

  const handleDatatableViewClick = useCallback(() => {
    setViewState("table");
  }, []);

  return {
    viewState,
    setViewState,
    handleCardViewClick,
    handleDatatableViewClick,
  };
}

export default useViewState;
