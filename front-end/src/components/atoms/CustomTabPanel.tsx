import { useState, type FC, type ReactNode } from "react";
import { Box, Button } from "@mui/material";

interface ITab {
  label: string;
  content: ReactNode;
  onLoad?: () => void;
}

interface ICustomTabPanel {
  defaultTabIndex: number;
  tabs: ITab[];
  tabPosition?: "top" | "bottom";
}

export const CustomTabPanel: FC<ICustomTabPanel> = ({
  defaultTabIndex,
  tabs,
  tabPosition = "bottom",
}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(defaultTabIndex);

  return (
    <Box
      className={`custom-tab-container ${
        tabPosition === "bottom" ? "tabs-on-bottom" : "tabs-on-top"
      }`}
    >
      <Box className="custom-tab-content">{tabs[selectedTabIndex].content}</Box>
      <Box className="custom-tab-button-container">
        {tabs.map((tab, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => {
              setSelectedTabIndex(index);
              if (tab.onLoad) {
                tab.onLoad();
              }
            }}
            className={`custom-tab-button ${
              index === selectedTabIndex ? "selected" : ""
            }`}
            size="small"
          >
            {tab.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
