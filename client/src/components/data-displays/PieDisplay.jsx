import React from "react";
import { PieChart, Pie } from "recharts";

export default function PieDisplay() {
  const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
  ];

  return (
    <PieChart width={1000} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data01}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
      />
    </PieChart>
  );
}
