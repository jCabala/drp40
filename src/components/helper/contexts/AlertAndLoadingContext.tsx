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
  setAlertTitle: Dispatch<SetStateAction<string | undefined>>;
  setAlertColor: Dispatch<SetStateAction<string | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
};

const AlertAndLoadingContext = createContext<ContextType>({} as ContextType);

function AlertAndLoadingProvider({ children }: { children: React.ReactNode }) {
  const [alertText, setAlertText] = useState<string | undefined>(undefined);
  const [alertTitle, setAlertTitle] = useState<string | undefined>(undefined);
  const [alertColor, setAlertColor] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldRenderLoading, setShouldRenderLoading] = useState<boolean>(true);

  useEffect(() => {
    if (alertText != undefined) {
      setTimeout(() => setAlertText(undefined), 5000);
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
    <AlertAndLoadingContext.Provider
      value={{ setAlertText, setAlertColor, setAlertTitle, setIsLoading, isLoading }}
    >
      {children}
      {alertText && (
        <Alert
          text={alertText}
          title={alertTitle}
          color={alertColor}
          exitAction={() => {
            setAlertText(undefined);
            setAlertColor(undefined);
            setAlertTitle(undefined);
          }}
        />
      )}
      {shouldRenderLoading && <LoadingOverlay />}
    </AlertAndLoadingContext.Provider>
  );
}

export { AlertAndLoadingProvider, AlertAndLoadingContext };
