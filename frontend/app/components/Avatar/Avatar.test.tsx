import renderer from "react-test-renderer";
import { Avatar } from "./Avatar";
import { IUser } from "~/types";

const testUser: IUser = {
  id: "1234-asdf",
  isOnline: true,
  lastSeen: new Date("2024-04-02T16:00:00"),
  joined: new Date("2023-03-01T08:00:00"),
  username: "qwerty",
};

describe("Avatar Snapshot", () => {
  it("Matches DOM Snapshot", () => {
    const domTree = renderer.create(<Avatar user={testUser} />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
