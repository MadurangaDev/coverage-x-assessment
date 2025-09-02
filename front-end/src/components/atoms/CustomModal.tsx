import type { FC, ReactNode } from "react";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ICustomModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  renderTitle?: (title: string) => ReactNode;
  maxWidth?:
    | number
    | string
    | {
        xs?: number | string;
        sm?: number | string;
        md?: number | string;
        lg?: number | string;
        xl?: number | string;
      };
  minWidth?:
    | number
    | string
    | {
        xs?: number | string;
        sm?: number | string;
        md?: number | string;
        lg?: number | string;
        xl?: number | string;
      };
  scrollableContent?: boolean;
}

export const CustomModal: FC<ICustomModalProps> = ({
  open,
  onClose,
  children,
  title,
  renderTitle = (title) => (
    <Typography
      fontWeight="bold"
      variant="h5"
      //   sx={{ color: Colors.textPrimary }}
    >
      {title}
    </Typography>
  ),
  maxWidth = {
    xs: "284px",
    sm: "420px",
    md: "540px",
  },
  minWidth = "auto",
  scrollableContent = true,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ zIndex: 99999 }}
      hideBackdrop={false}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          py: "24px",
          px: "18px",
          borderRadius: "8px",
          maxWidth: maxWidth,
          minWidth: minWidth,
          maxHeight: {
            xs: "calc(100% - 64px)",
            sm: "calc(100% - 72px)",
            md: "calc(100% - 96px)",
            lg: "calc(100% - 128px)",
          },
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {title ? renderTitle(title) : <></>}
          <IconButton onClick={onClose} sx={{ mt: "-8px", p: 0, ml: "auto" }}>
            <CloseIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            overflowY: scrollableContent ? "auto" : "hidden",
            overflowX: "hidden",
            flexGrow: 1,
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "silver",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
};
