import { assertIsPositive } from "./assert";

export function calculateTimestampInSeconds(
  startDate: string,
  endDate: string,
) {
  return (Date.parse(endDate) - Date.parse(startDate)) / 1000;
}

export function formatTimestamp(timestampInSeconds: number) {
  assertIsPositive(timestampInSeconds);

  let seconds = Math.round(timestampInSeconds);
  let minutes = 0;
  let hours = 0;

  if (seconds >= 60) {
    minutes = Math.floor(seconds / 60);
    seconds = Math.round(seconds % 60);
    if (minutes >= 60) {
      hours = Math.floor(minutes / 60);
      minutes = Math.round(minutes % 60);
    }
  }

  assertIsPositive(seconds);
  assertIsPositive(minutes);
  assertIsPositive(hours);

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function getMonthName(month: number) {
  const monthName = monthNames[month];
  if (!monthName) {
    throw new Error("Month not found");
  }
  return monthName;
}

export function formatDate(
  dateAndTime: string,
  shouldDisplayToday: boolean = true,
) {
  const date = new Date(dateAndTime);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const currentDate = new Date();

  if (
    currentDate.getDate() === day &&
    currentDate.getMonth() === month &&
    currentDate.getFullYear() === year &&
    shouldDisplayToday
  ) {
    return `Today, ${year}`;
  }

  return `${getMonthName(month)} ${day}, ${year}`;
}
