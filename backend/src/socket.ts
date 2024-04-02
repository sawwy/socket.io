import { Server as HttpServer } from "http";
import { Socket, Server } from "socket.io";
import { v4 } from "uuid";
import { IUser, IUserMessage } from "./types.ts";
import { MessageTypeEnum } from "./enums.ts";
export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;

  // Master list of all connected users
  public users: { [userId: string]: IUser };

  constructor(server: HttpServer) {
    ServerSocket.instance = this;
    this.users = {};
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin:
          process.env.NODE_ENV === "production"
            ? false
            : ["http://localhost:5173"],
      },
    });

    this.io.on("connect", this.startListeners);
  }

  startListeners = (socket: Socket) => {
    console.info("Message received from " + socket.id);

    socket.on("handshake", (username) => {
      console.info("USERNAME: " + username);
      console.info("Handshake received from: " + socket.id);

      const reconnectedUser = Object.values(this.users).find(
        (user) => user.id === socket.id
      );

      if (reconnectedUser) {
        console.info("This user has reconnected.");

        const uid = this.getUidFromSocketID(socket.id);

        if (uid) {
          this.users[uid].lastSeen = new Date();
          this.users[uid].isOnline = true;
          const users = Object.values(this.users);
          this.sendMessage("handshake_success", [reconnectedUser], {
            username,
            users,
          });
          return;
        }
      }

      const uid = v4();

      const newUser = {
        id: socket.id,
        username,
        isOnline: true,
        lastSeen: new Date(),
        joined: new Date(),
      };
      this.users[uid] = newUser;

      const users = Object.values(this.users);
      this.sendMessage("handshake_success", [newUser], {
        username,
        users,
      });

      this.sendMessage(
        "user_connected",
        users.filter((user) => user.id !== socket.id),
        users
      );
      this.sendMessage(
        "message",
        users.filter((user) => user.id !== socket.id),
        {
          type: MessageTypeEnum.SystemMessage,
          message: `${newUser.username} has joined the lobby, Hooray!`,
        }
      );
    });

    socket.on("disconnect", () => {
      console.info("Disconnect received from: " + socket.id);

      const uid = this.getUidFromSocketID(socket.id);

      if (uid) {
        const disconnectedUser = { ...this.users[uid] };
        this.users[uid].isOnline = false;

        const users = Object.values(this.users);

        this.sendMessage("user_disconnected", users, users);
        this.sendMessage(
          "message",
          users.filter((user) => user.id !== socket.id),
          {
            type: MessageTypeEnum.SystemMessage,
            message: `${disconnectedUser.username} has left the lobby, so long!`,
          }
        );
      }
    });

    socket.on("message", (message: IUserMessage) => {
      console.info("message received: ", message);
      this.io.emit("message", message);
    });
  };

  getUidFromSocketID = (id: string) => {
    return Object.keys(this.users).find((uid) => this.users[uid].id === id);
  };

  sendMessage = (name: string, users: IUser[], payload?: Object) => {
    console.info("Emitting event: " + name + " to", users);
    users.forEach((user) =>
      payload
        ? this.io.to(user.id).emit(name, payload)
        : this.io.to(user.id).emit(name)
    );
  };
}
