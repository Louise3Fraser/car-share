import React, { useState, useEffect } from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { Box, Card, Typography } from "@mui/material";
import axios from "axios";

export default function PieDisplay() {
  const [data, setData] = useState();
  const [currGas, setCurrGas] = useState();
  const [maxGas, setMaxGas] = useState();

  const data01 = [
    { name: "Louise", value:  20, fill: "#66da99"},
    { name: "Greer", value: 300, fill: "#f2a53a" },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8800/data");

        // Basic definitions at index 0
        setData(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (data && data[0]) {
      setCurrGas(data.currGas);
      setMaxGas(data.maxGas);
    }
  }, [data]);

  return (
    <Card
    elevation={0}
      sx={{
        aspectRatio: "1",
        
        width: "200px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        // backgroundColor: "#e3eaff"
      }}
    >
      <Typography variant="subheading">Gas Usage</Typography>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={70}
            fill="#e75f68"
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
