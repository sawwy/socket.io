export type UserType = {
  isOnline: boolean;
  lastSeen: Date;
  joined: Date;
  username: string;
  avatar: string;
  description: string;
};

export interface UserResponseType
  extends Omit<UserType, "lastSeen" | "joined"> {
  lastSeen: string;
  joined: string;
}

export type SelectedUserDataType = {
  user: UserType;
  rect: DOMRect;
};
