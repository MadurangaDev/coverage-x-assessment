import { useState, type FC } from "react";
import { Typography, Box, IconButton } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

import { SideBarItem } from "@components";
import Logo from "@images/logo.png";
import { useSnackbarContext } from "@hooks";
import { menuItems } from "@configs";

interface IHeaderProps {
  activeItem: string;
}

export const Header: FC<IHeaderProps> = ({ activeItem }) => {
  const [open, setOpen] = useState(false);

  const snackbar = useSnackbarContext();

  return (
    <>
      <Box className="header">
        <Box className="header-title-container">
          <img src={Logo} className="header-title-logo" />
          <Typography className="header-title heading-h1">
            Task Sparks
          </Typography>
          <Typography className="header-title-subtitle body-text">
            The Task Manager
          </Typography>
        </Box>
        <IconButton
          className="header-profile-button"
          onClick={() => {
            snackbar.showSnackbar(
              "The requirement didn't mentioned anything about authentication, so this button is non-functional and is here for future implementations.",
              "info"
            );
          }}
        >
          <PersonIcon />
        </IconButton>
        <IconButton
          className="header-navbar-button"
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Box className={`side-bar mobile ${open ? "opened" : ""}`}>
        <Box className="sidebar-top">
          <IconButton
            onClick={() => setOpen(false)}
            className="sidebar-close-button"
          >
            <CloseIcon />
          </IconButton>
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
    </>
  );
};
