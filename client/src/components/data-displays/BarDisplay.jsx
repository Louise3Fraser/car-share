import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Box } from "@mui/material";

export default function BarDisplay() {
  const data = [
    { name: "Louise", value: 400 },
    { name: "Greer", value: 300 },
  ];

  return (
    <Box
      sx={{
        aspectRatio: "1",
        width: "300px",
        backgroundColor: "white",
        borderRadius: "20px",
      }}
    >
      <ResponsiveContainer width="100%" height={250}>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
