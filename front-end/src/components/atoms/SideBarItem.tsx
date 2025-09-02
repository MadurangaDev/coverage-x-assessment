import { type ComponentType, type FC, type ReactNode } from "react";
import { Box, Typography, type SvgIconProps } from "@mui/material";
import { Link } from "react-router-dom";

interface ISideBarItemProps {
  label: string;
  icon: ComponentType<SvgIconProps>;
  to: string;
  active: boolean;
  disabled?: boolean;
}

export const SideBarItem: FC<ISideBarItemProps> = ({
  label,
  icon: Icon,
  to,
  active,
  disabled,
}) => {
  const LinkWrapper = ({ children }: { children: ReactNode }) => {
    if (disabled) {
      return (
        <Box className={`sidebar-item disabled ${active ? "active" : ""}`}>
          {children}
        </Box>
      );
    }
    return (
      <Link to={to} className={`sidebar-item ${active ? "active" : ""}`}>
        {children}
      </Link>
    );
  };

  return (
    <LinkWrapper>
      <Box className="selected-indicator" />
      <Box className="item-content">
        <Icon className="item-icon" />
        <Typography className="item-label">{label}</Typography>
      </Box>
    </LinkWrapper>
  );
};
