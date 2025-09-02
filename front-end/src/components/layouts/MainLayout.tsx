import type { FC } from "react";
import { Box } from "@mui/material";

import { Header, SideBar } from "@components";
import type { menuItemsEnum } from "@configs";

interface IMainLayoutProps {
  children: React.ReactNode;
  className?: string;
  currentPage: menuItemsEnum;
}

export const MainLayout: FC<IMainLayoutProps> = ({
  children,
  className,
  currentPage,
}) => {
  return (
    <Box className={`main-layout ${className}`}>
      <SideBar activeItem={currentPage} />
      <Box className="main-container">
        <Header activeItem={currentPage} />
        <Box className="main-content">{children}</Box>
      </Box>
    </Box>
  );
};
