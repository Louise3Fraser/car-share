import React, { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../../style/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
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
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import NotesIcon from "@mui/icons-material/Notes";
import PersonIcon from "@mui/icons-material/Person";
import {
  formatEvents,
  simpleToISO,
  dateObjToISO,
} from "./helpers/calendarHelpers";
import {
  editEvent,
  addEvent,
  fetchEvents,
  fetchProfileData,
} from "./helpers/dataApis";

const localizer = momentLocalizer(moment);

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

export default function Calendar2() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState();
  const [state, setState] = useState();
  const [originalStart, setOriginalStart] = useState();
  const [originalEnd, setOriginalEnd] = useState();
  const [profileData, setProfileData] = useState();

  // Modals:
  const [modal, setModal] = useState("empty");
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = useCallback(() => {
    setModal("empty");
    setOpenModal(false);
  }, []);

  // Get database events
  useEffect(() => {
    async function fetchData() {
      try {
        const events = await fetchEvents();
        const profile = await fetchProfileData();
        setData(events);
        setProfileData(profile);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const events = formatEvents(data);
      setEvents(events);
    }
  }, [loading]);

  useEffect(() => {
    if (data && profileData) {
      setLoading(false);
    }
  }, [data]);

  // handle click of adding new event. sends request
  const clickAddEvent = async () => {
    handleCloseModal();
    // addEvent(newEventData);
  };

  // handle click of editing an event. sends request
  const clickEditEvent = async () => {
    handleCloseModal();
    const events = editEvent(state);
    setData(events);
  };

  // To create a new event
  const handleDateClick = (selected) => {
    setModal("create");
    setState(selected);
  };

  // For viewing/editing events
  const handleEventClick = (selected) => {
    setModal("edit");
    setState(selected);
  };

  useEffect(() => {
    if (modal != "empty") {
      setState({
        title: state.title,
        description: state.description,
        user: state.user,
        distance: state.distance,
        start: state.start,
        end: state.end,
        allDay: state.allDay,
        id: state.id,
      });
      setOriginalStart(state.start);
      setOriginalEnd(state.end);
      handleOpenModal();
    }
  }, [modal]);

  function formatEndDate(newTime) {
    return simpleToISO(newTime, originalEnd);
  }

  function formatStartDate(newTime) {
    return simpleToISO(newTime, originalStart);
  }

  return (
    <Box>
      {!loading ? (
        <Calendar
          localizer={localizer}
          defaultView="month"
          views={["month", "week"]}
          selectable={true}
          events={events}
          style={{ height: "100vh" }}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={(event) => handleEventClick(event)}
          onSelectSlot={(event) => handleDateClick(event)}
          eventPropGetter={(event, start, end, isSelected) => {
            let newStyle = {
              backgroundColor: event.color,
              borderRadius: "0px",
              border: "none",
            };
            return {
              className: "",
              style: newStyle,
            };
          }}
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
              defaultValue={state ? state.title : ""}
              onChange={(e) =>
                setState({
                  ...state,
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
                defaultValue={
                  state
                    ? moment(state.start).toDate().toTimeString().split(" ")[0]
                    : ""
                }
                onChange={(e) =>
                  setState({
                    ...state,
                    start: formatStartDate(e.target.value),
                  })
                }
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={state ? state.allDay : false}
              />
              <TextField
                id="time"
                onChange={(e) =>
                  setState({
                    ...state,
                    end: formatEndDate(e.target.value),
                  })
                }
                defaultValue={
                  state
                    ? moment(state.end).toDate().toTimeString().split(" ")[0]
                    : ""
                }
                disabled={state ? state.allDay : false}
                label="End"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultValue={state ? state.allDay : false}
                    checked={state ? state.allDay : false}
                    onChange={(e) =>
                      setState({
                        ...state,
                        allDay: !state.allDay,
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
                  defaultValue={state ? state.user : ""}
                  onChange={(e) =>
                    setState({
                      ...state,
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
                  defaultValue={state ? state.description : ""}
                  onChange={(e) =>
                    setState({
                      ...state,
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
                  defaultValue={state ? state.distance : ""}
                  onChange={(e) =>
                    setState({
                      ...state,
                      distance: e.target.value,
                    })
                  }
                  label="Estimated distance"
                />
              </div>
            </div>
            {modal === "create" ? (
              <Button onClick={clickAddEvent} sx={{ color: "white" }}>
                Create
              </Button>
            ) : (
              <Button onClick={clickEditEvent} sx={{ color: "white" }}>
                Save
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </Box>
  );
}
