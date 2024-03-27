import { UserResponseType } from "~/types";

export const deserializeUsersResponse = (user: UserResponseType) => {
  const deserializedUser = {
    ...user,
    lastSeen: new Date(user.lastSeen),
    joined: new Date(user.joined),
  };

  return deserializedUser;
};
