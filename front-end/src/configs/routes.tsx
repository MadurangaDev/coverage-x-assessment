import { createBrowserRouter } from "react-router-dom";

import BallotIcon from "@mui/icons-material/Ballot";
import SettingsIcon from "@mui/icons-material/Settings";

import { MainPage } from "@pages";
import { MainLayout } from "@components";

export enum menuItemsEnum {
  TASKS = "Tasks",
  SETTINGS = "Settings",
}

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout currentPage={menuItemsEnum.TASKS}>
        <MainPage />
      </MainLayout>
    ),
  },
]);

export const menuItems = [
  {
    label: menuItemsEnum.TASKS,
    icon: <BallotIcon />,
    to: "/",
    disabled: false,
  },
  {
    label: menuItemsEnum.SETTINGS,
    icon: <SettingsIcon />,
    to: "/settings",
    disabled: true,
  },
];
