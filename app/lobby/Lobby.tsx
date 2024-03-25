import styles from "./styles.module.css";
import { Chat } from "./Chat/Chat";
import { Users } from "./Users/Users";
import { useState } from "react";
import { UserDetails } from "./UserDetails/UserDetails";
import { SelectedUserDataType } from "~/types";

export const Lobby = () => {
  const [selectedUserData, setSelectedUserData] =
    useState<SelectedUserDataType>();

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
