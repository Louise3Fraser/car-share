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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import NotesIcon from "@mui/icons-material/Notes";
import PersonIcon from "@mui/icons-material/Person";
import moment from "moment";

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
  const [newEventData, setNewEventData] = useState({
    title: "",
    description: "",
    user: userObject.name,
    distance: "",
    start: "",
    end: "",
    color: "",
    allDay: undefined,
    date: "",
    id: "",
  });

  const [modal, setModal] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const formatEvents = () => {
    let formattedEvents = [];
    console.log(data);
    data.forEach((data) => {
      const formattedEvent = {
        id: data.id,
        title: data.title,
        start: data.date,
        extendedProps: {
          distance: data.distance,
          user: data.user,
        },
        description: data.description,
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
    if (currentEvent.title) {
      setNewEventData({
        title: currentEvent.title,
        description: currentEvent.extendedProps.description,
        user: currentEvent.extendedProps.user,
        distance: currentEvent.extendedProps.distance,
        start: currentEvent.extendedProps.start,
        end: currentEvent.extendedProps.end,
        color: currentEvent.backgroundColor,
        allDay: currentEvent.allDay,
        date: currentEvent.start,
        id: currentEvent.id,
      });
    } else {
      if (currentEvent) handleOpenModal();
    }
  }, [currentEvent]);

  useEffect(() => {
    if (newEventData.title) {
      handleOpenModal();
    }
  }, [newEventData]);

  useEffect(() => {
    if (data[0]) {
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

  // useEffect(() => {
  //   if (profileData && profileData[0]) {
  //     const user = profileData.find((item) => item.idprofile === id);
  //     setNewEvent({...allValues, [e.target.color]: user.color});
  //   }
  // }, [profileData]);

  useEffect(() => {
    if (!loading && data) {
      formatEvents();
    }
  }, [loading]);

  // useEffect(() => {
  //   if (currentEvent) {
  //     setNewEvent(currentEvent);
  //   }
  //   console.log(newEvent)
  // }, [currentEvent]);

  const addEvent = async () => {
    handleCloseModal();
    // try {
    //   const response = await axios.post("http://localhost:8800/event", {
    //     newEvent,
    //   });
    //   setData(response);
    //   console.log(response);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const editEvent = async () => {
    handleCloseModal();
    try {
      const response = await axios.put(`http://localhost:8800/event/${id}`, {
        id: newEventData.id,
        title: newEventData.title,
        start: newEventData.date,
        end: newEventData.date,
        distance: newEventData.distance,
        user: newEventData.user,
        description: newEventData.description,
        date: newEventData.date,
        allDay: newEventData.allDay,
        color: newEventData.color,
      });
      setData(response);
    } catch (err) {
      console.log(err);
    }
  };

  // To create a new event
  const handleDateClick = (selected) => {
    console.log(selected);
    setModal("create");
    setCurrentEvent(selected);
  };

  // For viewing/editing events
  const handleEventClick = (selected) => {
    console.log(selected.event);
    setModal("edit");
    setCurrentEvent(selected.event);
  };

  return (
    <Box>
      {events ? (
        <FullCalendar
          height="85vh"
          headerToolbar={{
            left: "title",
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
          displayEventTime={false}
        />
      ) : (
        <div />
      )}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {modal === "create" ? (
              <Typography
                sx={{ display: "flex", justifyContent: "center" }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                Create New Event
              </Typography>
            ) : (
              <Typography
                sx={{ display: "flex", justifyContent: "center" }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                Edit Event
              </Typography>
            )}

            <TextField
              required
              variant="standard"
              defaultValue={newEventData ? newEventData.title : ""}
              onChange={(e) =>
                setNewEventData({
                  ...newEventData,
                  title: e.target.value,
                })
              }
              label="Title"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextField
                required
                id="time"
                label="Start"
                type="time"
                defaultValue={newEventData ? newEventData.start : ""}
                onChange={(e) =>
                  setNewEventData({
                    ...newEventData,
                    start: e.target.value,
                  })
                }
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={newEventData ? newEventData.allDay : false}
              />
              <TextField
                id="time"
                onChange={(e) =>
                  setNewEventData({
                    ...newEventData,
                    end: e.target.value,
                  })
                }
                defaultValue={newEventData ? newEventData.end : ""}
                disabled={newEventData ? newEventData.allDay : false}
                label="End"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultValue={newEventData ? newEventData.allDay : false}
                    checked={newEventData ? newEventData.allDay : false}
                    onChange={(e) =>
                      setNewEventData({
                        ...newEventData,
                        allDay: !newEventData.allDay,
                      })
                    }
                  />
                }
                labelPlacement="start"
                label="All day?"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div className="icon-format">
                <PersonIcon />
                <Select
                  sx={{ maxWidth: "100px", maxHeight: "30px" }}
                  defaultValue={newEventData ? newEventData.user : ""}
                  onChange={(e) =>
                    setNewEventData({
                      ...newEventData,
                      user: e.target.value,
                    })
                  }
                >
                  {users.map((user) => {
                    return (
                      <MenuItem key={user.id} value={user.name}>
                        {user.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
              <div className="icon-format">
                <NotesIcon />
                <TextField
                  required
                  variant="standard"
                  defaultValue={newEventData ? newEventData.description : ""}
                  onChange={(e) =>
                    setNewEventData({
                      ...newEventData,
                      description: e.target.value,
                    })
                  }
                  label="Description"
                  multiline
                />
              </div>

              <div className="icon-format">
                <LocalGasStationIcon />
                <TextField
                  required
                  variant="standard"
                  defaultValue={newEventData ? newEventData.distance : ""}
                  onChange={(e) =>
                    setNewEventData({
                      ...newEventData,
                      distance: e.target.value,
                    })
                  }
                  label="Estimated distance"
                />
              </div>
            </div>
            {modal === "create" ? (
              <Button onClick={addEvent} sx={{ color: "white" }}>
                Create
              </Button>
            ) : (
              <Button onClick={editEvent} sx={{ color: "white" }}>
                Save
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </Box>
  );
}
