import styles from "./styles.module.css";
import { Chat } from "./Chat/Chat";
import { Users } from "./Users/Users";
import { useContext, useEffect, useState } from "react";
import { UserDetails } from "./UserDetails/UserDetails";
import SocketContext from "~/contexts/Socket/Context";
import { startSocketListeners } from "~/utils/socket";

export const Lobby = () => {
  const { socket, username, selectedUserData } =
    useContext(SocketContext).SocketState;
  const dispatch = useContext(SocketContext).SocketDispatch;

  useEffect(() => {
    if (socket) {
      startSocketListeners(socket, dispatch);
      socket.emit("handshake", username);
    }

    () => {
      socket && socket.off();
    };
  }, []);

  return (
    <div className={styles.container}>
      <Chat />
      <Users />
      {selectedUserData && (
        <UserDetails
          key={selectedUserData.user.id}
          selectedUserData={selectedUserData}
        />
      )}
    </div>
  );
};
