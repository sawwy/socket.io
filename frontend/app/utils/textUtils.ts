import pluralize from "pluralize";

export const getJoinedText = (date: Date) => {
  return `${date.getDate()} ${date.toLocaleString("default", {
    month: "short",
  })} ${date.getFullYear()}`;
};

export const getLastSeenText = (date: Date) => {
  const now = new Date();
  if (date.getFullYear() < now.getFullYear()) {
    const year = now.getFullYear() - date.getFullYear();

    return `${pluralize("year", year, true)} ago`;
  }
  if (date.getMonth() < now.getMonth()) {
    const month = now.getMonth() - date.getMonth();

    return `${pluralize("month", month, true)} ago`;
  }
  if (date.getDate() < now.getDate()) {
    const day = now.getDate() - date.getDate();

    return `${pluralize("day", day, true)} ago`;
  }

  if (now.getHours() - date.getHours() > 0) {
    const hour = now.getHours() - date.getHours();

    return `${pluralize("hour", hour, true)} ago`;
  }

  return "< 1 hour ago";
};

const getMinutes = (date: Date) =>
  (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

export const getMessageTime = (date: Date) => {
  const now = new Date();
  if (now.toDateString() === date.toDateString()) {
    const minutes = getMinutes(date);
    return `Today at ${date.getHours()}:${minutes}`;
  }

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${getMinutes(
    date
  )}`;
};
