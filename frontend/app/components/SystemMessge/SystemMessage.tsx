import { ISystemMessage } from "~/types";
import styles from "./styles.module.css";

type SystemMessagePropsType = {
  message: ISystemMessage;
};

export const SystemMessage = ({ message }: SystemMessagePropsType) => {
  return (
    <div data-testid="chat-systemmessage" className={styles.message}>
      <p>{message.message}</p>
    </div>
  );
};
