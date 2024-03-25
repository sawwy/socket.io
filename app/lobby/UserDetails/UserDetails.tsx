import { SelectedUserDataType } from "~/types";
import styles from "./styles.module.css";
import { Avatar } from "~/components/Avatar/Avatar";
import pluralize from "pluralize";

type UserDetailsPropsType = {
  selectedUserData: SelectedUserDataType;
};

export const UserDetails = ({ selectedUserData }: UserDetailsPropsType) => {
  const { user, rect } = selectedUserData;

  const joinedText = () => {
    return `${user.joined.getDay()} ${user.joined.toLocaleString("default", {
      month: "short",
    })} ${user.joined.getFullYear()}`;
  };

  const lastSeenText = () => {
    const now = new Date();
    if (user.lastSeen.getFullYear() < now.getFullYear()) {
      const year = now.getFullYear() - user.lastSeen.getFullYear();

      return `${pluralize("year", year, true)} ago`;
    }
    if (user.lastSeen.getMonth() < now.getMonth()) {
      const month = now.getMonth() - user.lastSeen.getMonth();

      return `${pluralize("month", month, true)} ago`;
    }
    if (user.lastSeen.getDate() < now.getDate()) {
      const day = now.getDate() - user.lastSeen.getDate();

      return `${pluralize("day", day, true)} ago`;
    }

    if (now.getHours() - user.lastSeen.getHours() > 0) {
      const hour = now.getHours() - user.lastSeen.getHours();

      return `${pluralize("hour", hour, true)} ago`;
    }

    return "< 1 hour ago";
  };

  return (
    <div
      className={`${styles.container} ${styles.animateIn}`}
      style={{
        top: rect.top,
        left: rect.left - 256 - 16,
      }}
    >
      <div className={styles.header} />
      <div className={styles.avatar}>
        <Avatar user={user} />
      </div>
      <div className={styles.content}>
        <div className={styles.userDetails}>
          <div className={styles.username}>{user.username}</div>
          <div>
            <div className={styles.title}>LAST SEEN</div>
            <div className={styles.text}>{lastSeenText()}</div>
          </div>
          <div>
            <div className={styles.title}>JOINED</div>
            <div className={styles.text}>{joinedText()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
