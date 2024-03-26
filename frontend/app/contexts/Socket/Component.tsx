import { PropsWithChildren, useEffect, useReducer } from "react";
import {
  SocketContextProvider,
  SocketReducer,
  defaultSocketContextState,
} from "./Context";
import { useSocket } from "~/hooks/useSocket";

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent = ({ children }: ISocketContextComponentProps) => {
  const [SocketState, SocketDispatch] = useReducer(
    SocketReducer,
    defaultSocketContextState
  );

  const socket = useSocket("ws://localhost:3500", {
    reconnectionAttempts: 5,
    reconnectionDelay: 5000,
    autoConnect: false,
  });

  useEffect(() => {
    // connect web socket
    socket.connect();
    // save the socket
    SocketDispatch({ type: "update_socket", payload: socket });

    () => {
      socket.off();
    };
  }, []);

  return (
    <SocketContextProvider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContextProvider>
  );
};

export default SocketContextComponent;
