import { UserResponseType } from "~/types";

export const deserializeUsersResponse = (data: UserResponseType[]) => {
  const deserialized = data.map((user) => {
    return {
      ...user,
      lastSeen: new Date(user.lastSeen),
      joined: new Date(user.joined),
    };
  });

  return deserialized;
};
