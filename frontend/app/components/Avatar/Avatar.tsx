import { IUser } from "~/types";
import styles from "./styles.module.css";
import globalStyles from "~/styles/styles.module.css";
import { getColorHighlight } from "~/utils/colorUtils";

type AvatarPropsType = {
  user: IUser;
};

export const Avatar = ({ user }: AvatarPropsType) => {
  const idleTreshold = new Date();
  idleTreshold.setMinutes(idleTreshold.getMinutes() - 15);

  const isIdle = user.lastSeen.getTime() - idleTreshold.getTime() < 0;
  const usernameAbbreviation = user.username.slice(0, 2);

  return (
    <div className={styles.avatar}>
      <div
        className={`${styles.avatarContent} ${getColorHighlight(
          user,
          globalStyles
        )}
        )}`}
        aria-label={`avatar of user ${user.username}`}
      >
        <div>{usernameAbbreviation}</div>
      </div>
      {user.isOnline && (
        <div className={styles.status}>
          <div className={styles.online} />
          {isIdle && <div className={styles.idle} />}
        </div>
      )}
    </div>
  );
};
