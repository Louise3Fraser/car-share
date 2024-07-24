import moment from "moment";

// Return the calendar data that has been formatted to populate fullcalendar
export function formatEvents(data) {
  let formattedEvents = [];

  data.forEach((event) => {
    console.log("before event")
    console.log(event)
    var start = new Date(event.start);
    const offsetInMinutes = -360; // Central Standard Time (CST) offset is -6 hours from UTC
    start.setMinutes(start.getMinutes() - offsetInMinutes);

    var end = new Date(event.end);
    end.setMinutes(start.getMinutes() - offsetInMinutes);
    
    const formattedEvent = {
      id: event.id,
      title: event.title,
      start: start,
      end: end,
      distance: event.distance,
      user: event.user,
      description: event.description,
      color: event.color,
      allDay: event.allDay
    };

    console.log("After")
    console.log(formattedEvent)

    formattedEvents.push(formattedEvent);
  });
  return formattedEvents;
}

export function simpleToISO(newTime, original) {
  var [hours, minutes] = newTime.split(":").map(Number);
  var originalDate = new Date(original);
  originalDate.setUTCHours(hours, minutes, 0, 0);
  var modifiedDateString = originalDate.toISOString();
  return modifiedDateString;
}

export function dateObjToISO(newTime, timeZone) {
  const parsedDate = moment(newTime).tz(timeZone);
  if (parsedDate.isValid()) {
    return parsedDate.toISOString();
  } else {
    console.log("Invalid date format");
  }
}

export function disabledState(state) {
  return (
    state.title &&
    state.description &&
    state.distance &&
    state.user 
  );
}

// Get the current user
export function currentUser() {
  const storage = sessionStorage.getItem("user");
  const userObject = JSON.parse(storage);
  const user = userObject.name;
  return user;
}
