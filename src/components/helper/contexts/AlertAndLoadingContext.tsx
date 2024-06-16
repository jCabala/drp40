"use client";
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
  const [shouldRenderLoading, setShouldRenderLoading] = useState<boolean>(true);

  useEffect(() => {
    if (alertText != undefined) {
      setTimeout(() => setAlertText(undefined), 4000);
    }
  }, [alertText]);

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => setShouldRenderLoading(false), 1000);
      return () => clearTimeout(timeout);
    } else {
      setShouldRenderLoading(true);
    }
  }, [isLoading]);

  return (
    <AlertAndLoadingContext.Provider value={{ setAlertText, setIsLoading }}>
      {children}
      {alertText && (
        <Alert text={alertText} exitAction={() => setAlertText(undefined)} />
      )}
      {shouldRenderLoading && <LoadingOverlay />}
    </AlertAndLoadingContext.Provider>
  );
}

export { AlertAndLoadingProvider, AlertAndLoadingContext };
