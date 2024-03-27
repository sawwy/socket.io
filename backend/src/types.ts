import { MessageTypeEnum } from "./enums";

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
  username: string;
  timestamp: string;
}

export interface IUsers {
  [userId: string]: IUser;
}
