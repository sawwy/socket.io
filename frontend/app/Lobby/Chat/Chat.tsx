import {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./styles.module.css";
import SocketContext from "~/contexts/Socket/Context";
import { IMessage, ISystemMessage, IUserMessageResponse } from "~/types";
import { UserMessage } from "~/components/UserMessage/UserMessage";
import { MessageTypeEnum } from "~/enums";
import { SystemMessage } from "~/components/SystemMessge/SystemMessage";
import { deserializeUsersResponse } from "~/utils/serializationUtils";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { socket, username, isLoading, users } =
    useContext(SocketContext).SocketState;

  const user = users.find((user) => user.username === username);

  useEffect(() => {
    const onMessageEvent = (message: ISystemMessage | IUserMessageResponse) => {
      setMessages((prev) => {
        const newState = [...prev];
        if (message.type === MessageTypeEnum.UserMessage) {
          newState.push({
            ...message,
            user: deserializeUsersResponse(message.user),
          });
          return newState;
        }

        newState.push(message);
        return newState;
      });
    };
    socket?.on("message", onMessageEvent);

    return () => {
      socket?.off("message", onMessageEvent);
    };
  }, [socket, messages]);

  if (!socket) {
    return null;
  }

  const handleOnTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const textValue = e.target.value.toString();
    setMessage(textValue);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      const timestamp = new Date();
      socket.emit("message", {
        message,
        user,
        timestamp,
        type: MessageTypeEnum.UserMessage,
      });
      setMessage("");
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.map((message, i) =>
          message.type === MessageTypeEnum.UserMessage ? (
            <UserMessage key={i} user={message.user} message={message} />
          ) : (
            <SystemMessage key={i} message={message} />
          )
        )}
      </div>
      <input
        data-testid="chat-input"
        className={styles.input}
        value={message}
        onChange={handleOnTextInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
