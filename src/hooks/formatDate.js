// export default function formatDate(dateString) {
//   // Split the date string into year, month, day, hours, and minutes
//   const [year, month, day, hours, minutes] = dateString.split(/[-T:]/);

//   // Create a Date object with the parsed year, month (minus 1 as months are zero-based), day, hours, and minutes
//   const date = new Date(year, month - 1, day, hours, minutes);

//   // Define an array of month names
//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   // Get the month name from the month number (zero-based)
//   const monthName = monthNames[date.getMonth()];

//   // Get the day of the month with leading zero if needed
//   const formattedDay = String(date.getDate()).padStart(2, "0");

//   // Construct the formatted date string
//   const formattedDate = `${monthName} ${formattedDay}, ${year}`;

//   // Get the hours in 12-hour format and determine whether it's AM or PM
//   let formattedHours = date.getHours() % 12 || 12;
//   const period = date.getHours() < 12 ? "AM" : "PM";

//   // Get the minutes with leading zeros if needed
//   const formattedMinutes = String(date.getMinutes()).padStart(2, "0");

//   // Construct the formatted time string with AM or PM
//   const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

//   console.log(dateString, formattedDate, formattedTime);

//   return { date: formattedDate, time: formattedTime };
// }

export default function formatDate(dateString) {
  // Split the date string into parts
  const parts = dateString.split(/[-T:]/);

  // Extract year, month, day, hour, and minute from the parts
  const year = parts[0];
  const month = parts[1] ? parseInt(parts[1], 10) - 1 : null; // Subtract 1 to adjust for zero-based months
  const day = parts[2] ? parseInt(parts[2], 10) : null;
  const hour = parts[3] ? parseInt(parts[3], 10) : null;
  const minute = parts[4] ? parseInt(parts[4], 10) : null;

  // Create a Date object with the extracted parts
  const date = new Date(year, month, day, hour, minute);

  // Define an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get formatted date
  const formattedDate =
    month !== null && day !== null
      ? `${monthNames[date.getMonth()]} ${date.getDate()}, ${year}`
      : null;

  // Get formatted time in HH:MM AM/PM format
  const formattedTime =
    hour !== null && minute !== null ? formatTime(date) : null;

  return { date: formattedDate, time: formattedTime, year: year };
}

function formatTime(date) {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  return `${hours}:${minutes} ${ampm}`;
}
