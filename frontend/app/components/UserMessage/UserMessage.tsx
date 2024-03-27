import { IUser, IUserMessage } from "~/types";
import styles from "./styles.module.css";
import { Avatar } from "../Avatar/Avatar";
import { getMessageTime } from "~/utils/textUtils";

type UserMessagePropsType = {
  user?: IUser;
  message: IUserMessage;
};

export const UserMessage = ({ user, message }: UserMessagePropsType) => {
  const date = new Date(message.timestamp);
  console.log("date", date);

  return (
    <div className={styles.message}>
      {user && <Avatar user={user} showStatus={false} />}
      <div className={styles.messageDetails}>
        <div className={styles.messageHeader}>
          <p className={styles.username}>{message.username}</p>
          <p className={styles.messageTime}>{getMessageTime(date)}</p>
        </div>
        <p>{message.message}</p>
      </div>
    </div>
  );
};
