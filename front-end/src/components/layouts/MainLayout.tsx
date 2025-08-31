import type { FC } from "react";
import { Box } from "@mui/material";

import { Header, SideBar } from "@components";

interface IMainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout: FC<IMainLayoutProps> = ({ children, className }) => {
  return (
    <Box className={`main-layout ${className}`}>
      <SideBar />
      <Box className="main-container">
        <Header />
        <Box className="main-content">{children}</Box>
      </Box>
    </Box>
  );
};
