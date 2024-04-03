import { createContext } from "react";
import { Socket } from "socket.io-client";
import { IUser, SelectedUserDataType } from "~/types";

export interface ISocketContextState {
  username: string;
  users: IUser[];
  isLoading: boolean;
  socket?: Socket;
  selectedUserData?: SelectedUserDataType;
}

export const defaultSocketContextState: ISocketContextState = {
  socket: undefined,
  username: "",
  users: [],
  isLoading: false,
  selectedUserData: undefined,
};

export type SocketContextActionsType =
  | "update_socket"
  | "update_username"
  | "update_users"
  | "remove_user"
  | "set_loading"
  | "set_selecteduserdata";

export type SocketContextPayloadType =
  | string
  | IUser[]
  | Socket
  | boolean
  | SelectedUserDataType
  | undefined;

export interface ISocketContextActions {
  type: SocketContextActionsType;
  payload: SocketContextPayloadType;
}

export const SocketReducer = (
  state: ISocketContextState,
  action: ISocketContextActions
) => {
  switch (action.type) {
    case "update_socket":
      return { ...state, socket: action.payload as Socket };
    case "update_username":
      return { ...state, username: action.payload as string };
    case "update_users":
      return { ...state, users: action.payload as IUser[] };
    case "set_loading":
      return { ...state, isLoading: action.payload as boolean };
    case "set_selecteduserdata":
      return {
        ...state,
        selectedUserData: action.payload as SelectedUserDataType,
      };
    default:
      return { ...state };
  }
};

export interface ISocketContextProps {
  SocketState: ISocketContextState;
  SocketDispatch: React.Dispatch<ISocketContextActions>;
}

const SocketContext = createContext<ISocketContextProps>({
  SocketState: defaultSocketContextState,
  SocketDispatch: () => {},
});

export const SocketCOntextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

export default SocketContext;
