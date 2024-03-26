import { useContext } from "react";
import styles from "./styles.module.css";
import { SelectedUserDataType } from "~/types";
import { User } from "../User/User";
import SocketContext from "~/contexts/Socket/Context";

type UsersPropsType = {
  setSelectedUserData: React.Dispatch<
    React.SetStateAction<SelectedUserDataType | undefined>
  >;
};

export const Users = ({ setSelectedUserData }: UsersPropsType) => {
  const { users } = useContext(SocketContext).SocketState;

  const onlineUsers = users.filter((user) => user.isOnline);
  const offlineusers = users.filter((user) => !user.isOnline);

  return (
    <div className={styles.users}>
      <div>
        <div
          data-testid="lobby-online-users-heading"
          className={styles.usersHeading}
        >
          <span>ONLINE - {onlineUsers.length}</span>
        </div>
        {onlineUsers.map((user) => {
          return (
            <User
              key={user.username}
              user={user}
              setSelectedUserData={setSelectedUserData}
            />
          );
        })}
      </div>
      <div>
        <div
          data-testid="lobby-offline-users-heading"
          className={styles.usersHeading}
        >
          <span>OFFLINE - {offlineusers.length}</span>
        </div>
        {offlineusers.map((user) => {
          return (
            <User
              key={user.username}
              user={user}
              setSelectedUserData={setSelectedUserData}
            />
          );
        })}
      </div>
    </div>
  );
};
