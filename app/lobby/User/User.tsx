import { useRef } from "react";
import styles from "./styles.module.css";
import { SelectedUserDataType, UserType } from "~/types";
import { Avatar } from "~/components/Avatar/Avatar";
import colorTheme from "~/themes/theme-color.css";

type UserPropsType = {
  user: UserType;
  setSelectedUserData: React.Dispatch<
    React.SetStateAction<SelectedUserDataType | undefined>
  >;
};

export const User = ({ user, setSelectedUserData }: UserPropsType) => {
  const userContainerRef = useRef<HTMLButtonElement>(null);

  const idleTreshold = new Date();
  idleTreshold.setMinutes(-15);

  const handleOnClickUser = (user: UserType) => {
    if (userContainerRef.current) {
      const rect = userContainerRef.current.getBoundingClientRect();
      setSelectedUserData({
        user,
        rect,
      });
    }
  };

  return (
    <button
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
