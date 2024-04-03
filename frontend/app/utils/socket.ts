import { IHandshakeResponse, IUserResponse } from "~/types";
import { deserializeUsersResponse } from "./serializationUtils";
import { ISocketContextActions } from "~/contexts/Socket/Context";
import { Socket } from "socket.io-client";

export const startSocketListeners = (
  socket: Socket,
  dispatch: React.Dispatch<ISocketContextActions>
) => {
  socket.on("handshake_success", ({ username, users }: IHandshakeResponse) => {
    console.log("handshake success", username, users);
    dispatch({ type: "update_username", payload: username });
    dispatch({
      type: "update_users",
      payload: users.map((user) => deserializeUsersResponse(user)),
    });
    dispatch({ type: "set_loading", payload: false });
  });

  socket.on("user_connected", (users: IUserResponse[]) => {
    console.info("User connected, new user list received");
    dispatch({
      type: "update_users",
      payload: users.map((user) => deserializeUsersResponse(user)),
    });
  });

  socket.on("user_disconnected", (users: IUserResponse[]) => {
    console.info("User disconnected, new user list received");
    dispatch({
      type: "update_users",
      payload: users.map((user) => deserializeUsersResponse(user)),
    });
  });

  socket.io.on("reconnect", (attempt: number) => {
    console.info("Reconnected on attempt: ", attempt);
  });

  socket.io.on("reconnect_attempt", (attempt: number) => {
    console.info("Reconnection attempt: ", attempt);
  });

  socket.io.on("reconnect_error", (error: Error) => {
    console.info("Reconnection attempt: ", error);
  });

  socket.io.on("reconnect_failed", () => {
    console.info("Reconnection failed");
  });
};
