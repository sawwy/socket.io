import { useState, useId, ChangeEvent, KeyboardEvent, useContext } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "@remix-run/react";
import { UsernameErrorsEnum } from "~/enums";
import SocketContext from "~/contexts/Socket/Context";

export const Joinroom = () => {
  const [usernameError, setUsernameError] = useState("");
  const { username } = useContext(SocketContext).SocketState;
  const usernameInputId = useId();
  const navigate = useNavigate();
  const dispatch = useContext(SocketContext).SocketDispatch;

  const handleJoinRoom = () => {
    if (username.length < 4) {
      setUsernameError(UsernameErrorsEnum.TooShort);
      return;
    }
    navigate("/lobby");
  };

  const handleOnTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const textValue = e.target.value.toString();
    dispatch({ type: "update_username", payload: textValue });
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
