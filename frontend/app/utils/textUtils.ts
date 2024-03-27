import pluralize from "pluralize";
import { IUser } from "~/types";

export const getJoinedText = (user: IUser) => {
  return `${user.joined.getDate()} ${user.joined.toLocaleString("default", {
    month: "short",
  })} ${user.joined.getFullYear()}`;
};

export const getLastSeenText = (user: IUser) => {
  const now = new Date();
  if (user.lastSeen.getFullYear() < now.getFullYear()) {
    const year = now.getFullYear() - user.lastSeen.getFullYear();

    return `${pluralize("year", year, true)} ago`;
  }
  if (user.lastSeen.getMonth() < now.getMonth()) {
    const month = now.getMonth() - user.lastSeen.getMonth();

    return `${pluralize("month", month, true)} ago`;
  }
  if (user.lastSeen.getDate() < now.getDate()) {
    const day = now.getDate() - user.lastSeen.getDate();

    return `${pluralize("day", day, true)} ago`;
  }

  if (now.getHours() - user.lastSeen.getHours() > 0) {
    const hour = now.getHours() - user.lastSeen.getHours();

    return `${pluralize("hour", hour, true)} ago`;
  }

  return "< 1 hour ago";
};

export const getMessageTime = (date: Date) => {
  const now = new Date();
  if (now.toDateString() === date.toDateString()) {
    return `Today at ${date.getHours()}:${date.getMinutes()}`;
  }

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};
