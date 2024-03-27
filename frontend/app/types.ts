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

interface IMessageBase {
  message: string;
  username: string;
  timestamp: string;
}

export interface IUserMessage extends IMessageBase {
  type: MessageTypeEnum.UserMessage;
}

export interface ISystemMessage extends IMessageBase {
  type: MessageTypeEnum.SystemMessage;
}

export type IMessage = ISystemMessage | IUserMessage;
