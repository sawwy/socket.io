import styles from "./styles.module.css";
import { Chat } from "./chat/Chat";
import { Users } from "./users/Users";

export const Lobby = () => {
  return (
    <div className={styles.container}>
      <Chat />
      <Users />
    </div>
  );
};
