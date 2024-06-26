import { IUser } from "~/types";
import styles from "./styles.module.css";
import globalStyles from "~/styles/styles.module.css";
import { getColorFill as getColorFill } from "~/utils/colorUtils";

type AvatarPropsType = {
  user: IUser;
  showStatus?: boolean;
};

export const Avatar = ({ user, showStatus = true }: AvatarPropsType) => {
  const idleTreshold = new Date();
  idleTreshold.setMinutes(idleTreshold.getMinutes() - 15);

  const isIdle = user.lastSeen.getTime() - idleTreshold.getTime() < 0;
  const usernameAbbreviation = user.username.slice(0, 2);

  return (
    <div className={styles.avatar}>
      <div
        className={`${styles.avatarContent} ${getColorFill(user)}
        )}`}
        aria-label={`avatar of user ${user.username}`}
      >
        <div>{usernameAbbreviation}</div>
      </div>
      {showStatus && user.isOnline && (
        <div className={styles.status}>
          <div className={styles.online} />
          {isIdle && <div className={styles.idle} />}
        </div>
      )}
    </div>
  );
};
