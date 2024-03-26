import { ChangeEvent, KeyboardEvent, useState } from "react";
import styles from "./styles.module.css";

export const Chat = () => {
  const [message, setMessage] = useState("");

  const handleOnTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const textValue = e.target.value.toString();
    setMessage(textValue);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      setMessage("");
    }
  };

  return (
    <div className={styles.chat}>
      <div className={styles.messages}></div>
      <input
        className={styles.input}
        value={message}
        onChange={handleOnTextInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
