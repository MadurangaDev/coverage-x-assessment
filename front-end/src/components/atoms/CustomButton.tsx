import { type FC, type ReactNode } from "react";
import { Button, CircularProgress } from "@mui/material";

interface ICustomButtonProps {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
}

export const CustomButton: FC<ICustomButtonProps> = ({
  className = "",
  onClick,
  children,
  isLoading = false,
  disabled = false,
  type = "button",
  icon,
}) => (
  <Button
    className={`custom-button ${className}`}
    onClick={onClick}
    disabled={disabled || isLoading}
    type={type}
    variant="contained"
    startIcon={icon}
    size="small"
  >
    {isLoading ? <CircularProgress /> : children}
  </Button>
);
