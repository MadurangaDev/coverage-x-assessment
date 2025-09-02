import { type FC } from "react";
import { Box, Typography } from "@mui/material";

import Logo from "@images/logo.png";
import { SideBarItem } from "@components";
import { menuItems, menuItemsEnum } from "@configs";

interface ISideBarProps {
  activeItem: menuItemsEnum;
}

export const SideBar: FC<ISideBarProps> = ({ activeItem }) => {
  return (
    <Box className={`side-bar`}>
      <Box className="sidebar-top">
        <img src={Logo} alt="Task Sparks Logo" className="sidebar-logo" />
        <Box className="sidebar-menu">
          {menuItems.map((item) => (
            <SideBarItem
              key={item.label}
              label={item.label}
              icon={() => item.icon}
              to={item.to}
              active={activeItem === item.label}
              disabled={item.disabled}
            />
          ))}
        </Box>
      </Box>
      <Box className="sidebar-version">
        <Typography className="body-text">V.1.0.0</Typography>
      </Box>
    </Box>
  );
};
