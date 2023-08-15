import moment from "moment/moment";
import "../../style/Calendar.css";
import { TableCell, TableRow } from "@mui/material";

export const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let momentObject = moment();

const firstDay = () => {
  let dateObject = momentObject;
  let firstDay = moment(dateObject).startOf("month").format("d");
  return firstDay;
};

let empty = [];

for (let i = 0; i < firstDay(); i++) {
  empty.push(
    <TableCell
      key={Math.random() + 1}
      sx={{
        border: "1px solid #a8a7a7",
        padding: "5px",
        height: "13vh",
        verticalAlign: "top",
      }}
      className="empty-day"
    ></TableCell>
  );
}

let monthDays = [];

for (let day = 1; day <= momentObject.daysInMonth(); day++) {
  monthDays.push(
    <TableCell
      align="left"
      key={day}
      className="month-day"
      sx={{
        border: "1px solid #a8a7a7",
        padding: "5px",
        height: "13vh",
        verticalAlign: "top",
      }}
    >
      {day}
    </TableCell>
  );
}

var totalSlots = [...empty, ...monthDays];
let rows = [];
let cells = [];

totalSlots.forEach((row, i) => {
  if (i % 7 !== 0 || i === 0) {
    cells.push(row);
  } else {
    rows.push(cells);
    cells = [];
    cells.push(row);
  }
});
rows.push(cells);

export const days = rows.map((d, i) => {
  return <TableRow>{d}</TableRow>;
});
