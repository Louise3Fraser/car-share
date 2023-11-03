import axios from "axios";
import { dateObjToISO } from "./calendarHelpers";

export const fetchProfileData = async () => {
  try {
    const response = await axios.get(`http://localhost:8800/profile`)
    return response.data
  } catch (error) {
    console.log(error);
  }
};

// Fetch events
export const fetchEvents = async () => {
  try {
    const response = await axios.get("http://localhost:8800/event");
    return response.data
  } catch (error) {
    console.log(error);
  }
};

// Add new event
export const addEvent = async (newEventData) => {
  try {
    const response = await axios.post("http://localhost:8800/event", {
      newEventData,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Edit event
export const editEvent = async (state) => {
    var start = dateObjToISO(state.start)
    var end = dateObjToISO(state.end)

    console.log(start)
  try {
    const response = await axios.put(
      `http://localhost:8800/event/${state.id}`,
      {
        id: state.id,
        title: state.title,
        start: start,
        end: end,
        distance: state.distance,
        user: state.user,
        description: state.description,
        allDay: false
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};
