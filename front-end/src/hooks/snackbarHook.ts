import { createContext, useContext } from "react";

export interface ISnackbarMessage {
  key: number;
  message: string;
  variant: "success" | "error" | "warning" | "info";
  position: number;
}

interface ISnackbarContextType {
  showSnackbar: (message: string, variant: ISnackbarMessage["variant"]) => void;
}

const SnackbarContext = createContext<ISnackbarContextType | undefined>(
  undefined
);

const useSnackbarContext = (): ISnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      "useSnackbarContext must be used within a SnackbarProvider"
    );
  }
  return context;
};

export { useSnackbarContext, SnackbarContext };
