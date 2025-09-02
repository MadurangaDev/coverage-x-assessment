import { useState, type FC } from "react";
import { Typography, Box, IconButton } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import BallotIcon from "@mui/icons-material/Ballot";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

import { SideBarItem } from "@components";
import Logo from "@images/logo.png";

export const Header: FC = () => {
  const [open, setOpen] = useState(false);

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
        <IconButton className="header-profile-button">
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
            <SideBarItem
              label="Tasks"
              icon={() => <BallotIcon />}
              to="/"
              active
            />
            <SideBarItem
              label="Settings"
              icon={() => <SettingsIcon />}
              to="/settings"
              active={false}
              disabled
            />
          </Box>
        </Box>
        <Box className="sidebar-version">
          <Typography className="body-text">V.1.0.0</Typography>
        </Box>
      </Box>
    </>
  );
};
