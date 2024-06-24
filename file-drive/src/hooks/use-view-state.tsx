import { useEffect, useState } from "react";

export type ViewState = "card" | "table" | null;

function useViewState(
  storageKey: string,
  initialView: ViewState = null,
) {
  const [viewState, setViewState] = useState<ViewState>(null);

  useEffect(() => {
    const storedView = localStorage.getItem(storageKey) as ViewState;
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

  const handleCardViewClick = () => {
    setViewState("card");
  };

  const handleDatatableViewClick = () => {
    setViewState("table");
  };

  return {
    viewState,
    setViewState,
    handleCardViewClick,
    handleDatatableViewClick,
  };
}

export default useViewState;
