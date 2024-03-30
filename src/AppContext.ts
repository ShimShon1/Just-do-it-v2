import { createContext, useContext } from "react";

type AppContext = {
  hideDone: boolean;
  keepText: boolean;
  handleHideDone: () => void;
  handleKeepText: () => void;
};

export const appContext = createContext<AppContext | undefined>(
  undefined
);

export function useAppContext() {
  const context = useContext(appContext);
  if (context === undefined) {
    throw new Error("App context unavailable, fix man");
  }
  return context;
}
