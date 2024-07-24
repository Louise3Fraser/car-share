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
  disabledState,
} from "./helpers/calendarHelpers";
import {
  editEvent,
  addEvent,
  fetchEvents,
  fetchProfileData,
} from "./helpers/dataApis";
import { red } from "@mui/material/colors";

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

export default function CalendarView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState();
  const [state, setState] = useState({
    title: "",
    description: "",
    user: JSON.parse(sessionStorage.getItem("user")).name,
    distance: "",
    start: new Date(),
    end: new Date(),
    allDay: 0,
    color: "",
  });
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
        setLoading(false);
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

  function assignColor(user) {
    const userProfile = profileData.find((profile) => profile.user === user);
    return userProfile
      ? profileData.find((profile) => profile.user === user).color
      : profileData.color; // Default color if no match is found
  }

  /**
   * Called when an event is added after clicking "create" button.
   */
  const clickAddEvent = async () => {
    handleCloseModal();
    console.log("Add event state: ");
    await addEvent(state);

    setData((prevData) => {
    const updatedData = [...prevData, state];
    setEvents(formatEvents(updatedData)); // Update events with formatted data
    return updatedData;
  }); };

  // handle click of editing an event. sends request
  const clickEditEvent = async () => {
    handleCloseModal();
    const events = editEvent(state);
    setData(events);
  };

  /**
   * Called when clicking on a date.
   * @param selected The clicked/selected data.
   */
  const handleDateClick = (selected) => {
    // console.log("selected:");
    // console.log(selected.start);

    // Reset state field:
    setState({
      ...state,
      title: "",
      description: "",
      user: JSON.parse(sessionStorage.getItem("user")).name,
      distance: "",
      start: moment(selected.start)
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toDate(),
      end: moment(selected.start)
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toDate(),
      allDay: 0,
      color: assignColor(state.user),
    });

    // Modal version: CREATE new event
    setModal("create");
  };

  /**
   * Called when clicking on event.
   * @param selected The clicked/selected data.
   */
  const handleEventClick = (selected) => {
    setModal("edit");
    setState(selected);
  };

  useEffect(() => {
    if (modal != "empty") {
      // Need to default times to correct time object:
      setOriginalStart(state.start);
      setOriginalEnd(state.end);

      handleOpenModal();
    }
  }, [modal]);

  function formatEndDate(newTime) {
    const [hours, minutes] = newTime.split(":");
    const end = moment(originalEnd)
      .set({ hour: hours, minute: minutes })
      .toDate();
    return end;
  }

  function formatStartDate(newTime) {
    const [hours, minutes] = newTime.split(":");
    const start = moment(originalStart)
      .set({ hour: hours, minute: minutes })
      .toDate();
    return start;
  }

  function CreateButton() {
    if (!disabledState(state)) {
      return (
        <Button size="small" color="primary" variant="outlined" disabled>
          Create
        </Button>
      );
    } else
      return (
        <Button
          size="small"
          color="primary"
          variant="outlined"
          onClick={clickAddEvent}
        >
          Create
        </Button>
      );
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
              backgroundColor: red,
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
              value={state.title}
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
                value={moment(state.start).format("HH:mm")}
                onChange={(e) => {
                  console.log(e.target.value);
                  setState({
                    ...state,
                    start: formatStartDate(e.target.value),
                  });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={Boolean(state.allDay)}
              />
              <TextField
                required
                id="time"
                label="End"
                type="time"
                value={moment(state.end).format("HH:mm")}
                onChange={(e) => {
                  console.log(e.target.value);
                  setState({
                    ...state,
                    end: formatEndDate(e.target.value),
                  });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={Boolean(state.allDay)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(state.allDay)}
                    onChange={(e) =>
                      setState({
                        ...state,
                        allDay: e.target.checked,
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
                  value={state.user}
                  onChange={(e) => {
                    const selectedUser = e.target.value;
                    const color = assignColor(selectedUser);
                    setState({
                      ...state,
                      user: selectedUser,
                      color: color,
                    });
                  }}
                >
                  {profileData &&
                    profileData.map((user) => {
                      return (
                        <MenuItem key={user.idprofile} value={user.user}>
                          {user.user}
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
                  value={state.description}
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
                  value={state.distance}
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
              <CreateButton />
            ) : (
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={clickEditEvent}
              >
                Save
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </Box>
  );
}
