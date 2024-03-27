import styles from "./styles.module.css";
import { Chat } from "./Chat/Chat";
import { Users } from "./Users/Users";
import { useContext, useEffect, useState } from "react";
import { UserDetails } from "./UserDetails/UserDetails";
import { SelectedUserDataType, UserResponseType } from "~/types";
import SocketContext from "~/contexts/Socket/Context";
import { deserializeUsersResponse } from "~/utils/serializationUtils";

export const Lobby = () => {
  const [selectedUserData, setSelectedUserData] =
    useState<SelectedUserDataType>();

  const { socket, username } = useContext(SocketContext).SocketState;
  const dispatch = useContext(SocketContext).SocketDispatch;

  useEffect(() => {
    // TODO: navigate to joinroom if no username
    if (socket) {
      // connect web socket
      startListeners();
      // send the handshake
      sendHandshake();
    }

    () => {
      socket && socket.off();
    };
  }, []);

  const startListeners = () => {
    if (socket) {
      socket.on("user_connected", (users: UserResponseType[]) => {
        console.info("User connected, new user list received");
        dispatch({
          type: "update_users",
          payload: users.map((user) => deserializeUsersResponse(user)),
        });
      });

      socket.on("user_disconnected", (users: UserResponseType[]) => {
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
    }
  };
  const sendHandshake = () => {
    if (socket) {
      socket.emit(
        "handshake",
        username,
        (username: string, users: UserResponseType[]) => {
          dispatch({ type: "update_username", payload: username });
          dispatch({
            type: "update_users",
            payload: users.map((user) => deserializeUsersResponse(user)),
          });
          dispatch({ type: "set_loading", payload: false });
        }
      );
    }
  };

  return (
    <div className={styles.container}>
      <Chat />
      <Users setSelectedUserData={setSelectedUserData} />
      {selectedUserData && (
        <UserDetails
          key={selectedUserData.user.username}
          selectedUserData={selectedUserData}
          setSelectedUserData={setSelectedUserData}
        />
      )}
    </div>
  );
};
