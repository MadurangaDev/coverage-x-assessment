import { type FC } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export const Header: FC = () => {
  return (
    <Box className="header">
      <Box className="header-title-container">
        <Typography className="header-title heading-h1">Task Sparks</Typography>
        <Typography className="header-title-subtitle body-text">
          The Task Manager
        </Typography>
      </Box>
      <IconButton className="header-profile-button">
        <PersonIcon />
      </IconButton>
    </Box>
  );
};
