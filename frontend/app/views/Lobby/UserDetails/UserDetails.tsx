import { SelectedUserDataType } from "~/types";
import styles from "./styles.module.css";
import globalStyles from "~/styles/styles.module.css";
import { Avatar } from "~/components/Avatar/Avatar";
import { getColorFill } from "~/utils/colorUtils";
import { useContext, useRef } from "react";
import { useOnClickOutside } from "~/hooks/useOnClickOutside";
import { getJoinedText, getLastSeenText } from "~/utils/textUtils";
import SocketContext from "~/contexts/Socket/Context";

type UserDetailsPropsType = {
  selectedUserData: SelectedUserDataType;
};

export const UserDetails = ({ selectedUserData }: UserDetailsPropsType) => {
  const { user, rect } = selectedUserData;
  const ref = useRef(null);
  const dispatch = useContext(SocketContext).SocketDispatch;

  const handleClickOutside = (event: MouseEvent | TouchEvent | FocusEvent) => {
    if (event instanceof MouseEvent) {
      if (
        event.clientX > rect.left &&
        event.clientX < rect.right &&
        event.clientY > rect.top &&
        event.clientY < rect.bottom
      ) {
        return;
      }
    }

    dispatch({ type: "set_selecteduserdata", payload: undefined });
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div
      ref={ref}
      className={`${styles.container} ${styles.animateIn}`}
      style={{
        top: rect.top,
        left: rect.left - 256 - 16,
      }}
    >
      <div className={`${styles.header} ${getColorFill(user, globalStyles)}`} />
      <div className={styles.avatar}>
        <Avatar user={user} />
      </div>
      <div
        data-testid={`lobby-user-details-${user.username}`}
        className={styles.content}
      >
        <div className={styles.userDetails}>
          <div className={styles.username}>{user.username}</div>
          <div>
            <div className={styles.title}>LAST SEEN</div>
            <div className={styles.text}>{getLastSeenText(user.lastSeen)}</div>
          </div>
          <div>
            <div className={styles.title}>JOINED</div>
            <div className={styles.text}>{getJoinedText(user.joined)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
