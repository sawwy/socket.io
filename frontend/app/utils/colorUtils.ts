import { IUser } from "~/types";

type StylesType = {
  readonly [key: string]: string;
};

export const getColorHighlight = (user: IUser, styles: StylesType) => {
  if (user.username.match(/^[a-c]/i)) {
    return styles.colorFillBlue;
  }
  if (user.username.match(/^[d-k]/i)) {
    return styles.colorFillPink;
  }

  return styles.colorFillGreen;
};
