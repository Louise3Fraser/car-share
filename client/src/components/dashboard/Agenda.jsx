import React, { useState, useEffect } from "react";
import "../../style/Stats.css";
import {
  useTheme,
  useMediaQuery,
  Box,
  CircularProgress,
  Card,
} from "@mui/material";
import "../../style/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { fetchEvents } from "./helpers/dataApis";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";
import color from "color";

export default function Agenda() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const screenSize = useMediaQuery(theme.breakpoints.up("md"));

  // Get database events
  useEffect(() => {
    async function fetchData() {
      try {
        const events = await fetchEvents();
        setData(events);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log(data);
    }
  }, [loading]);

  const formatTimeRange = (start, end) => {
    const startTime = moment(start).format("MMM Do, YYYY h:mm A");
    const endTime = moment(end).format("h:mm A");
    return `${startTime} - ${endTime}`;
  };

  function lighten(eventColor) {
    return color(eventColor).lighten(0.4).hex();
  }

  return (
    <Box className="Agenda">
      {!loading ? (
        <div>
          {data.slice(0, 5).map((event) => {
            return (
              <div key={event.id}>
                <Card
                  elevation={0}
                  sx={{ p: 0, backgroundColor: lighten(event.color) }}
                >
                  <Box
                    sx={{
                      borderLeft: 1,
                      borderWidth: 9,
                      borderColor: event.color,
                      padding: 1.3,
                    }}
                  >
                    <h3>{event.title}</h3>
                    <div
                      id="time"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "4px",
                        alignItems: "center",
                        paddingBottom: "7px",
                      }}
                    >
                      <AccessTimeIcon sx={{ fontSize: 13 }} />
                      <p className="p-time">
                        {formatTimeRange(event.start, event.end)}
                      </p>
                    </div>
                    <p className="p-event">
                      {event.description ? event.description : "--"}
                    </p>
                  </Box>
                </Card>
                <div style={{ height: "7px" }} />
              </div>
            );
          })}
        </div>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}
