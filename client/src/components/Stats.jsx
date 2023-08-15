import React from "react";
import "../style/Stats.css";
import PieDisplay from "./data-displays/PieDisplay"


export default function Stats() {
  return (
    <div className="Stats">
      <PieDisplay/>
    </div>
  );
}
