import React from "react";
import "../../style/Stats.css";
import BarDisplay from "../data-displays/BarDisplay";
import PieDisplay from "../data-displays/PieDisplay";
import { useTheme, useMediaQuery, Box } from "@mui/material";
import Agenda from "./Agenda";
import Calendar from "./Calendar";

export default function Stats() {
  const theme = useTheme();
  const screenSize = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      display="flex"
      flexDirection={screenSize ? "row" : "column"}
      gap={2}
      height="100%" // Ensure the container takes the full available height
    >
      <Box
        flexShrink={0} // Prevent the calendar from shrinking
        style={{
          width: screenSize ? "60%" : "100%", // Adjust width based on screen size
          minWidth: "300px", // Ensure a minimum width for the calendar
        }}
      >
        <Calendar />
      </Box>

      <Box
        flexGrow={1} // Allow the stats container to grow and take up the remaining space
        display="flex"
        flexDirection="column"
        gap={2}
        style={{
          height: "100%", // Ensure the stats container takes the full available height
        }}
      >
        <div className="stats" style={{ flex: "1 1 auto" }}>
          <h3>Upcoming Trips</h3>
          <Agenda />
        </div>
      </Box>
    </Box>
  );
}