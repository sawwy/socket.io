import { useEffect, useState } from "react";
import styles from "./styles.module.css";

type UserType = {
  isOnline: boolean;
  lastSeen: Date;
  joined: Date;
  username: string;
  avatar: string;
  description: string;
};

interface UserResponseType extends Omit<UserType, "lastSeen" | "joined"> {
  lastSeen: string;
  joined: string;
}

const deserializeUsersResponse = (data: UserResponseType[]) => {
  const deserialized = data.map((user) => {
    return {
      ...user,
      lastSeen: new Date(user.lastSeen),
      joined: new Date(user.joined),
    };
  });

  return deserialized;
};

export const Users = () => {
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

  const idleTreshold = new Date();
  idleTreshold.setMinutes(-15);

  return (
    <div className={styles.users}>
      {users.map((user) => {
        return (
          <div className={styles.user} key={user.username}>
            <div className={styles.avatar}>
              <img alt={`avatar of user ${user.username}`} src={user.avatar} />
              {user.isOnline && (
                <div className={styles.status}>
                  <div className={styles.online} />
                  {user.lastSeen > idleTreshold && (
                    <div className={styles.idle} />
                  )}
                </div>
              )}
            </div>
            <span>{user.username}</span>
          </div>
        );
      })}
    </div>
  );
};
