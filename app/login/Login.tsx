import { useState, useId, ChangeEvent } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "@remix-run/react";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [loginErrorText, setLoginErrorText] = useState("");
  const usernameInputId = useId();
  const navigate = useNavigate();

  const onHandleClickLogin = () => {
    if (!(username.length > 3)) {
      setLoginErrorText("Username must be longer than 3 characters");
      return;
    }
    navigate("/lobby");
  };

  const handleOnTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const textValue = e.target.value.toString();
    setUsername(textValue);
    if (loginErrorText) {
      if (textValue.length > 3) {
        setLoginErrorText("");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.input}>
          <label htmlFor={usernameInputId}>Username:</label>
          <input
            id={usernameInputId}
            name="username"
            value={username}
            onChange={handleOnTextInputChange}
          />
        </div>

        <button className={styles.loginButton} onClick={onHandleClickLogin}>
          Login
        </button>
        <div className={styles.errorText}>{loginErrorText}</div>
      </div>
    </div>
  );
};
