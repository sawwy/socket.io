export interface IUser {
  id: string;
  isOnline: boolean;
  lastSeen: Date;
  joined: Date;
  username: string;
  avatar?: string;
  description?: string;
}

export interface UserResponseType extends Omit<IUser, "lastSeen" | "joined"> {
  lastSeen: string;
  joined: string;
}

export type SelectedUserDataType = {
  user: IUser;
  rect: DOMRect;
};

export interface IMessage {
  message: string;
  username: string;
  timestamp: string;
}
