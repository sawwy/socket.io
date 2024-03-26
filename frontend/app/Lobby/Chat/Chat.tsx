import {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./styles.module.css";
import SocketContext from "~/contexts/Socket/Context";
import { IMessage, IUser } from "~/types";
import { Avatar } from "~/components/Avatar/Avatar";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { socket, username, isLoading, users } =
    useContext(SocketContext).SocketState;

  useEffect(() => {
    const onMessageEvent = (message: IMessage) => {
      setMessages((prev) => {
        const newState = [...prev];
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
      socket.emit("message", { message, username, timestamp });
      setMessage("");
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const user = users.find((user) => user.username === username);

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.map((message, i) => {
          return (
            <div key={i} className={styles.message}>
              {user && <Avatar user={user} />}
              <div>
                <p>{message.username}</p>
                <p>{message.timestamp}</p>
                <p>{message.message}</p>
              </div>
            </div>
          );
        })}
      </div>
      <input
        className={styles.input}
        value={message}
        onChange={handleOnTextInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
