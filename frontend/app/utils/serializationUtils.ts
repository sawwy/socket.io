import { IUserResponse } from "~/types";

export const deserializeUsersResponse = (user: IUserResponse) => {
  const deserializedUser = {
    ...user,
    lastSeen: new Date(user.lastSeen),
    joined: new Date(user.joined),
  };

  return deserializedUser;
};
