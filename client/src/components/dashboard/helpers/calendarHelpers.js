import moment from "moment";

// Return the calendar data that has been formatted to populate fullcalendar
export function formatEvents(data) {
  let formattedEvents = [];

  data.forEach((event) => {
    var start = moment(event.start).toDate();
    var end = moment(event.end).toDate();

    const formattedEvent = {
      id: event.id,
      title: event.title,
      start: start,
      end: end,
      distance: event.distance,
      user: event.user,
      description: event.description,
      color: event.color,
    };

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

export function dateObjToISO(newTime) {
  const parsedDate = new Date(newTime);
  if (!isNaN(parsedDate)) {
    const isoString = parsedDate.toISOString();
    return isoString
  } else {
    console.log("Invalid date format");
  }
}
