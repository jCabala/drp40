"use client"
import React, {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
  useEffect,
} from "react";
import Alert from "../Alert";
import LoadingOverlay from "../LoadingOverlay";

type ContextType = {
  setAlertText: Dispatch<SetStateAction<string | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const AlertAndLoadingContext = createContext<ContextType>({} as ContextType);

function AlertAndLoadingProvider({ children }: { children: React.ReactNode }) {
  const [alertText, setAlertText] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (alertText != undefined) {
      setTimeout(() => setAlertText(undefined), 4000);
    }
  }, [alertText]);

  return (
    <AlertAndLoadingContext.Provider value={{ setAlertText, setIsLoading }}>
      {children}
      {alertText && (
        <Alert text={alertText} exitAction={() => setAlertText(undefined)} />
      )}
      {isLoading && <LoadingOverlay />}
    </AlertAndLoadingContext.Provider>
  );
}

export { AlertAndLoadingProvider, AlertAndLoadingContext };
