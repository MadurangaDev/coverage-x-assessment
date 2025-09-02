import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { routes } from "@configs";
import { store } from "@redux";
import { SnackbarProvider } from "@providers";

describe("App boot", () => {
  it("mounts router without crashing", () => {
    render(
      <Provider store={store}>
        <SnackbarProvider>
          <RouterProvider router={routes} />
        </SnackbarProvider>
      </Provider>
    );
  });
});


