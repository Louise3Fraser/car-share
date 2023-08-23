import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
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

// const useStyles = makeStyles((theme) => ({
//     container: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     textField: {
//       marginLeft: theme.spacing(1),
//       marginRight: theme.spacing(1),
//       width: 200,
//     },
//   }));

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

export default function EditEvent({
  currentEvent,
  openEditEvent,
  handleCloseEditEvent,
}) {
  const storage = sessionStorage.getItem("user");
  const userObject = JSON.parse(storage);
  const id = userObject.id;

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [distance, setDistance] = useState();
  const [user, setUser] = useState();
  const [allDay, setAllDay] = useState(false);

  // Start and end times:
  const [start, setStart] = useState("10:00:00");
  const [end, setEnd] = useState("10:00:00");

  const startChange = (date) => {
    console.log(date);
    setStart(date);
  };
  // date not editable
  const [startDate, setStartDate] = useState();

  //   useEffect(() => {
  //     console.log("hi")
  //     if (currentEvent) {
  //         const startForm = currentEvent.start;
  //         console.log(startForm)
  //         setStart(currentEvent.range)
  //     }
  //   }, );

  useEffect(() => {
    console.log(start);
  }, [start, setStart]);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const editEvent = async () => {
    console.log("hi")
    console.log(start)
    handleCloseEditEvent();

    // API call to UPDATE information
    try {
      const response = await axios.put(`http://localhost:8800/event/${id}`, {
        title: title,
        dist: distance,
        user: user,
        date: startDate,
        desc: description,
        allDay: allDay,
        start: start,
        end: end,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      open={openEditEvent}
      onClose={handleCloseEditEvent}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Typography
            sx={{ display: "flex", justifyContent: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Edit Event
          </Typography>

          <TextField
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
              id="time"
              label="Start"
              type="time"
              onChange={(e) => setStart(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={allDay}
            />
            <TextField
              id="time"
              onChange={(e) => setEnd(e.target.value)}
              disabled={allDay}
              label="End"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={allDay}
                  onChange={() => setAllDay(!allDay)}
                />
              }
              labelPlacement="start"
              label="All day?"
            />
          </div>
          <Typography>
            {currentEvent ? moment(currentEvent.start).format("h:mm a") : ""}
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
              value={currentEvent ? currentEvent.extendedProps.user : ""}
              onChange={(e) => setUser(e.target.value)}
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
              defaultValue={
                currentEvent ? currentEvent.extendedProps.description : ""
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              multiline
            />
            <TextField
              sx={{ maxWidth: "20px" }}
              variant="standard"
              defaultValue={
                currentEvent ? currentEvent.extendedProps.distance : ""
              }
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              label="Estimated distance"
            />
          </div>
          <Button onClick={editEvent} sx={{ color: "white" }}>
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
