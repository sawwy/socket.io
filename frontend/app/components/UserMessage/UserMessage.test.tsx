import renderer from "react-test-renderer";
import { UserMessage } from "./UserMessage";
import { ISystemMessage, IUser, IUserMessage } from "~/types";
import { MessageTypeEnum } from "~/enums";

const testUser: IUser = {
  id: "1234-asdf",
  isOnline: true,
  lastSeen: new Date("2024-04-02T16:00:00"),
  joined: new Date("2023-03-01T08:00:00"),
  username: "qwerty",
};

const message: IUserMessage = {
  type: MessageTypeEnum.UserMessage,
  message: "Qwerty has joined the lobby",
  user: testUser,
  timestamp: new Date("2024-04-02T16:00:00").toISOString(),
};

describe("SystemMessage Snapshot", () => {
  it("Matches DOM Snapshot", () => {
    const domTree = renderer.create(<UserMessage message={message} />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
