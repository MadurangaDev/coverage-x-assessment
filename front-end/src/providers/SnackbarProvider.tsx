import { type FC, useState, type ReactNode } from "react";
import { Snackbar, type SnackbarCloseReason, Alert } from "@mui/material";

import { SnackbarContext, type ISnackbarMessage } from "@hooks";

const SnackbarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbars, setSnackbars] = useState<ISnackbarMessage[]>([]);

  const showSnackbar = (
    message: string,
    variant: ISnackbarMessage["variant"]
  ) => {
    const key = new Date().getTime() + Math.random();
    setSnackbars((prev) => [
      ...prev.map((snackbar) => ({
        ...snackbar,
        position: snackbar.position + 1,
      })),
      { key, message, variant, position: 0 },
    ]);
  };

  const handleClose =
    (key: number) =>
    (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason === "clickaway") return;
      setSnackbars((prev) => prev.filter((snackbar) => snackbar.key !== key));
    };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbars.map(({ key, message, variant, position }) => (
        <Snackbar
          key={key}
          open
          autoHideDuration={6000}
          onClose={handleClose(key)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          style={{ top: `${24 + position * 56}px`, position: "fixed" }}
        >
          <Alert
            onClose={handleClose(key)}
            severity={variant}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ))}
    </SnackbarContext.Provider>
  );
};

export { SnackbarProvider };
