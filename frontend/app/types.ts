import { MessageTypeEnum } from "./enums";

export interface IUser {
  id: string;
  isOnline: boolean;
  lastSeen: Date;
  joined: Date;
  username: string;
}

export interface IUserResponse extends Omit<IUser, "lastSeen" | "joined"> {
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
  user: IUser;
  timestamp: string;
}

export interface ISystemMessage {
  type: MessageTypeEnum.SystemMessage;
  message: string;
}

export interface IUserMessageResponse extends Omit<IUserMessage, "user"> {
  user: IUserResponse;
}

export type IMessage = ISystemMessage | IUserMessage;

export type IHandshakeResponse = {
  username: string;
  users: IUserResponse[];
};
