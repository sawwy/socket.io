import { UserType } from "~/types";

type StylesType = {
  readonly [key: string]: string;
};

export const getColorHighlight = (user: UserType, styles: StylesType) => {
  if (user.username.match(/^[a-c]/)) {
    return styles.colorFillBlue;
  }
  if (user.username.match(/^[d-k]/)) {
    return styles.colorFillPink;
  }

  return styles.colorFillGreen;
};
