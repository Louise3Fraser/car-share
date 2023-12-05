import React from "react";
import { Card, CardContent, CardMedia } from "@mui/material";
import Marker from "../../images/Marker.png";

export default function Facts() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card elevation={0} sx={{ width: "10lh" }}>
        <CardMedia
          sx={{ height: 60, width: 40 }}
          image={Marker}
          title="green iguana"
        />
        <CardContent> Miles Driven</CardContent>
      </Card>
      <Card elevation={0}>
        <CardContent> Car Trips </CardContent>
      </Card>
    </div>
  );
}
