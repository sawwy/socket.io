import { SelectedUserDataType } from "~/types";
import styles from "./styles.module.css";
import globalStyles from "~/styles/styles.module.css";
import { Avatar } from "~/components/Avatar/Avatar";
import { getColorHighlight } from "~/utils/colorUtils";
import { useRef } from "react";
import { useOnClickOutside } from "~/hooks/useOnClickOutside";
import { getJoinedText, getLastSeenText } from "~/utils/textUtils";

type UserDetailsPropsType = {
  selectedUserData: SelectedUserDataType;
  setSelectedUserData: React.Dispatch<
    React.SetStateAction<SelectedUserDataType | undefined>
  >;
};

export const UserDetails = ({
  selectedUserData,
  setSelectedUserData,
}: UserDetailsPropsType) => {
  const { user, rect } = selectedUserData;
  const ref = useRef(null);

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

    setSelectedUserData(undefined);
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
      <div
        className={`${styles.header} ${getColorHighlight(user, globalStyles)}`}
      />
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
            <div className={styles.text}>{getLastSeenText(user)}</div>
          </div>
          <div>
            <div className={styles.title}>JOINED</div>
            <div className={styles.text}>{getJoinedText(user)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
