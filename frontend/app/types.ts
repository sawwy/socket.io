import { MessageTypeEnum } from "./enums";

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

export interface IUserMessage {
  type: MessageTypeEnum.UserMessage;
  message: string;
  username: string;
  timestamp: string;
}

export interface ISystemMessage {
  type: MessageTypeEnum.SystemMessage;
  message: string;
  username: string;
  timestamp: string;
}

export type IMessage = ISystemMessage | IUserMessage;
