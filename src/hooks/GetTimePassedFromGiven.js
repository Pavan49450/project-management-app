export default function GetTimePassedFromGiven(dateString) {
  const date = new Date(dateString);
  const today = new Date();

  // Calculate the difference in milliseconds
  const differenceInMs = today - date;

  // Calculate the number of milliseconds in a day
  const msInDay = 1000 * 60 * 60 * 24;

  // Calculate the number of days passed
  const daysPassed = Math.floor(differenceInMs / msInDay);

  if (daysPassed < 30) {
    return `${daysPassed} day${daysPassed !== 1 ? "s" : ""} ago`;
  } else if (daysPassed < 365) {
    const monthsPassed = Math.floor(daysPassed / 30);
    return `${monthsPassed} mon${monthsPassed !== 1 ? "s" : ""} ago`;
  } else {
    const yearsPassed = Math.floor(daysPassed / 365);
    return `${yearsPassed} yr${yearsPassed !== 1 ? "s" : ""} ago`;
  }
}
