import React from "react";
import { weekday, days } from "./calendarDefinitions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import "../../style/Calendar.css";

export default function Calendar() {
  return (
    <div className="Calendar">
      <h1>Month</h1>
      <Table sx={{ maxWidth: "70%", tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            {weekday.map((day) => {
              return (
                <TableCell
                  sx={{
                    width: "90px",
                    padding: "5px",
                    border: "1px solid #a8a7a7",
                  }}
                  align="left"
                  key={Math.random()}
                  className="week-day"
                >
                  {day}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>{days}</TableBody>
      </Table>
    </div>
  );
}
