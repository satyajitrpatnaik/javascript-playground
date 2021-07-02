import React from "react";

const AppValueContext = React.createContext();

export function AppValueProvider({ children }) {
  const [appValue, setAppValue] = React.useState("");
  const value = { appValue, setAppValue };
  return (
    <AppValueContext.Provider value={value}>
      {children}
    </AppValueContext.Provider>
  );
}

export function useAppValue() {
  const context = React.useContext(AppValueContext);
  if (context === undefined) {
    throw new Error(
      "useAppValue custom hook must be used within AppValueProvider."
    );
  }
  return context;
}
