import renderer from "react-test-renderer";
import { SystemMessage } from "./SystemMessage";
import { ISystemMessage, IUser } from "~/types";
import { MessageTypeEnum } from "~/enums";

const message: ISystemMessage = {
  type: MessageTypeEnum.SystemMessage,
  message: "Qwerty has joined the lobby",
};

describe("SystemMessage Snapshot", () => {
  it("Matches DOM Snapshot", () => {
    const domTree = renderer
      .create(<SystemMessage message={message} />)
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
