import { useNavigate } from "@remix-run/react";
import { useContext, useEffect } from "react";
import { Lobby } from "~/views/Lobby/Lobby";
import SocketContext from "~/contexts/Socket/Context";

export default function LobbyRoute() {
  const { username } = useContext(SocketContext).SocketState;
  const navigate = useNavigate();
  useEffect(() => {
    if (!username) {
      navigate("/joinroom");
    }
  }, [username]);
  return <Lobby />;
}
