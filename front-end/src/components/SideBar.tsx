import { useState, type FC } from "react";
import { Box, Typography } from "@mui/material";
import BallotIcon from "@mui/icons-material/Ballot";
import SettingsIcon from "@mui/icons-material/Settings";

import Logo from "@images/logo.png";
import { SideBarItem } from "@components";

export const SideBar: FC = () => {
  return (
    <Box className={`side-bar`}>
      <Box className="sidebar-top">
        <img src={Logo} alt="Task Sparks Logo" className="sidebar-logo" />
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
  );
};
