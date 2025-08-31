import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { routes } from "@configs";
import { store } from "@redux";
import { SnackbarProvider } from "@providers";

import "@styles/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarProvider>
        <RouterProvider router={routes} />
      </SnackbarProvider>
    </Provider>
  </StrictMode>
);
