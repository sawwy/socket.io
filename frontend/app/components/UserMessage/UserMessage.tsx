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

  return (
    <div data-testid="chat-usermessage" className={styles.message}>
      {user && <Avatar user={user} showStatus={false} />}
      <div className={styles.messageDetails}>
        <div
          data-testid="chat-usermessage-header"
          className={styles.messageHeader}
        >
          <p className={styles.username}>{message.user.username}</p>
          <p className={styles.messageTime}>{getMessageTime(date)}</p>
        </div>
        <p>{message.message}</p>
      </div>
    </div>
  );
};
