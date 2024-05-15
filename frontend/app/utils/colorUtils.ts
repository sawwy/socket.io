import { IUser } from "~/types";
import globalStyles from "~/styles/styles.module.css";

export const getColorFill = (user: IUser) => {
  if (user.username.match(/^[a-c]/i)) {
    return globalStyles.fillColorBlue;
  }
  if (user.username.match(/^[d-k]/i)) {
    return globalStyles.fillColorPink;
  }

  return globalStyles.fillColorGreen;
};
