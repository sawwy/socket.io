import { useState, useId, ChangeEvent, KeyboardEvent } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "@remix-run/react";
import { UsernameErrors } from "~/enums";

export const JoinRoom = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const usernameInputId = useId();
  const navigate = useNavigate();

  const handleJoinRoom = async () => {
    if (!(username.length > 3)) {
      setUsernameError(UsernameErrors.TooShort);
      return;
    }
    const response = await fetch("/api/v1/joinroom", {
      method: "POST",
    });

    if (response.ok) {
      navigate("/lobby");
    }
  };

  const handleOnTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const textValue = e.target.value.toString();
    setUsername(textValue);
    if (usernameError) {
      if (textValue.length > 3) {
        setUsernameError("");
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleJoinRoom();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.joinroom}>
        <div className={styles.input}>
          <label htmlFor={usernameInputId}>Username:</label>
          <input
            data-testid="username-input"
            id={usernameInputId}
            name="username"
            value={username}
            onChange={handleOnTextInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          data-testid="joinroom-button"
          className={styles.joinroomButton}
          onClick={handleJoinRoom}
        >
          Join Room
        </button>
        <div data-testid="username-errors" className={styles.errorText}>
          {usernameError}
        </div>
      </div>
    </div>
  );
};
