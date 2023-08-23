import React, { useState, useEffect, useCallback } from "react";
import "../../style/Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SmallCar from "../../images/SmallCar.svg";
import axios from "axios";
import EditEvent from "./calendar-modals/EditEvent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

// temporary
const users = [
  {
    id: 1,
    name: "Greer",
    email: "greerfraser10@gmail.com",
    password: "Vball12345!",
  },
  {
    id: 2,
    name: "Louise",
    email: "louise3fraser@gmail.com",
    password: "Incorect3!",
  },
];

export default function CalendarView() {
  const initialEvents = [];
  const storage = sessionStorage.getItem("user");
  const userObject = JSON.parse(storage);
  const id = userObject.id;

  const [data, setData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(true);

  const [currentEvent, setCurrentEvent] = useState("");
  const [title, setTitle] = useState(initialEvents);
  const [description, setDescription] = useState(initialEvents);
  const [distance, setDistance] = useState("");
  const [user, setUser] = useState("");
  const [initialUser, setInitialUser] = useState(userObject.name);
  const [startDate, setStartDate] = useState("");
  const [color, setColor] = useState("");

  // Modal for events:
  const [openEditEvent, setOpenEditEvent] = useState(false);
  const handleOpenEditEvent = () => setOpenEditEvent(true);
  const handleCloseEditEvent = useCallback(() => {
    setOpenEditEvent(false)
  }, []);

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const formatEvents = () => {
    let formattedEvents = [];
    data.forEach((data) => {
      const formattedEvent = {
        id: data.id,
        title: data.title,
        start: data.date,
        extendedProps: {
          distance: data.dist,
          user: data.user,
        },
        description: data.desc,
        color: data.color,
      };
      formattedEvents.push(formattedEvent);
    });
    setEvents(formattedEvents);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8800/event");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (data[0] !== undefined) {
      setLoading(false);
    }

    const fetchColor = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/profile`);
        setProfileData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchColor();
  }, [data]);

  useEffect(() => {
    if (profileData && profileData[0]) {
      const user = profileData.find((item) => item.idprofile === id);
      setColor(user.color);
    }
  }, [profileData]);



  useEffect(() => {
    if (!loading) {
      formatEvents();
    }
  }, [loading]);

  useEffect(() => {
    if (currentEvent) {
      setUser(currentEvent.extendedProps.user);
    }
  }, [currentEvent]);

  const addEvent = async () => {
    handleCloseAdd();
    try {
      const response = await axios.post("http://localhost:8800/event", {
        title: title,
        dist: distance,
        user: user || initialUser,
        date: startDate,
        desc: description,
        color: color,
      });
      setData(response);
    } catch (err) {
      console.log(err);
    }
  };

  const editEvent = async () => {
    handleCloseEditEvent();

    try {
      const response = await axios.put(`http://localhost:8800/event/${id}`, {
        title: title,
        dist: distance,
        user: user || initialUser,
        date: startDate,
        desc: description,
      });
      setData(response);
    } catch (err) {
      console.log(err);
    }
  };

  // To create a new event
  const handleDateClick = (selected) => {
    setStartDate(selected.start);
    handleOpenAdd();
  };

  // For viewing/editing events
  const handleEventClick = (selected) => {
    console.log(currentEvent);

    setCurrentEvent(selected.event);
    handleOpenEditEvent();
  };

  return (
    <Box>
      {events ? (
        <FullCalendar
          height="85vh"
          headerToolbar={{
            left: "dayGridMonth,timeGridWeek,timeGridDay",
            center: "title",
            right: "today prev,next",
          }}
          select={handleDateClick}
          eventClick={handleEventClick}
          eventsSet={(events) => setEvents(events)}
          initialEvents={events}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
        />
      ) : (
        <div />
      )}
      <EditEvent
        currentEvent={currentEvent}
        openEditEvent={openEditEvent}
        handleCloseEditEvent={handleCloseEditEvent}
      />

      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <img
              style={{ height: "18px" }}
              className="logo"
              src={SmallCar}
              alt="smallCar"
            />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add New Event
            </Typography>
          </div>
          <Typography>
            {currentEvent ? currentEvent.start.toString() : ""}
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              gap: "10px",
            }}
          >
            <Select
              sx={{ maxWidth: "100px", maxHeight: "30px" }}
              value={initialUser}
              onChange={(e) => setInitialUser(e.target.value)}
            >
              {users.map((user) => {
                return (
                  <MenuItem key={user.id} value={user.name}>
                    {user.name}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField
              variant="standard"
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
            />
            <TextField
              variant="standard"
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              multiline
            />
            <TextField
              variant="standard"
              onChange={(e) => setDistance(e.target.value)}
              label="Estimated distance"
            />
          </div>
          <Button onClick={addEvent} sx={{ color: "white" }}>
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
