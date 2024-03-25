import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { SelectedUserDataType, UserResponseType, UserType } from "~/types";
import { deserializeUsersResponse } from "~/utils/serializationUtils";
import { User } from "../User/User";

type UsersPropsType = {
  setSelectedUserData: React.Dispatch<
    React.SetStateAction<SelectedUserDataType | undefined>
  >;
};

export const Users = ({ setSelectedUserData }: UsersPropsType) => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/v1/users");
      if (response.ok) {
        const data: UserResponseType[] = await response.json();
        setUsers(deserializeUsersResponse(data));
      }
    };

    fetchUsers();
  }, []);

  const onlineUsers = users.filter((user) => user.isOnline);
  const offlineusers = users.filter((user) => !user.isOnline);

  return (
    <div className={styles.users}>
      <div>
        <div className={styles.usersHeading}>
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
        <div className={styles.usersHeading}>
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
