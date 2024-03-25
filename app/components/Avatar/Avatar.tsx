import { UserType } from "~/types";
import styles from "./styles.module.css";

type AvatarPropsType = {
  user: UserType;
};

export const Avatar = ({ user }: AvatarPropsType) => {
  const idleTreshold = new Date();
  idleTreshold.setMinutes(idleTreshold.getMinutes() - 15);

  const isIdle = user.lastSeen.getTime() - idleTreshold.getTime() < 0;

  return (
    <div className={styles.avatar}>
      <img alt={`avatar of user ${user.username}`} src={user.avatar} />
      {user.isOnline && (
        <div className={styles.status}>
          <div className={styles.online} />
          {isIdle && <div className={styles.idle} />}
        </div>
      )}
    </div>
  );
};
