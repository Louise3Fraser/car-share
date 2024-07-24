import React from "react";
import "../../style/Stats.css";
import BarDisplay from "../data-displays/BarDisplay";
import PieDisplay from "../data-displays/PieDisplay";
import { useTheme, useMediaQuery, Box } from "@mui/material";


export default function Stats() {
  const theme = useTheme();
  const screenSize = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box
      className="Stats"
      display={screenSize ? "flex" : "block"}
      flexDirection={screenSize ? "column" : "column"}
      justifyContent={screenSize ? "start" : "start"}
      alignItems={screenSize ? "start" : "start"}
    >
      <PieDisplay />
      {/* <BarDisplay/> */}
    </Box>
  );
}
