import { useContext, useRef } from "react";
import styles from "./styles.module.css";
import { IUser } from "~/types";
import { Avatar } from "~/components/Avatar/Avatar";
import SocketContext from "~/contexts/Socket/Context";

type UserPropsType = {
  user: IUser;
};

export const User = ({ user }: UserPropsType) => {
  const userContainerRef = useRef<HTMLButtonElement>(null);
  const { selectedUserData } = useContext(SocketContext).SocketState;
  const dispatch = useContext(SocketContext).SocketDispatch;

  const idleTreshold = new Date();
  idleTreshold.setMinutes(-15);

  const handleOnClickUser = (user: IUser) => {
    if (userContainerRef.current) {
      const rect = userContainerRef.current.getBoundingClientRect();

      if (selectedUserData?.user.username === user.username) {
        dispatch({ type: "set_selecteduserdata", payload: undefined });
      } else {
        dispatch({
          type: "set_selecteduserdata",
          payload: {
            user,
            rect,
          },
        });
      }
    }
  };

  return (
    <button
      data-testid={`lobby-user-button-${user.username}`}
      ref={userContainerRef}
      className={`${styles.user} ${!user.isOnline && styles.offline}`}
      key={user.username}
      onClick={() => handleOnClickUser(user)}
    >
      <Avatar user={user} />
      <span>{user.username}</span>
    </button>
  );
};
