import { createBrowserRouter } from "react-router-dom";

import { MainPage } from "@pages";
import { MainLayout } from "@components";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <MainPage />
      </MainLayout>
    ),
  },
]);
