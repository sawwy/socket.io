import { MessageTypeEnum } from "./enums.ts";

export interface IUser {
  id: string;
  username: string;
  isOnline: boolean;
  lastSeen: Date;
  joined: Date;
}

export interface IUserMessage {
  messageType: MessageTypeEnum.UserMessage;
  message: string;
  user: IUser;
  timestamp: string;
}

export interface IUsers {
  [userId: string]: IUser;
}
