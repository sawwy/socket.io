import { Server as HttpServer } from "http";
import { Socket, Server } from "socket.io";
import { v4 } from "uuid";

interface IUser {
  id: string;
  username: string;
  isOnline: boolean;
  lastSeen: Date;
  joined: Date;
}

interface IMessage {
  message: string;
  username: string;
  timestamp: string;
}

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;

  /** Master list of all connected users */
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

    this.io.on("connect", this.StartListeners);
  }

  StartListeners = (socket: Socket) => {
    console.info("Message received from " + socket.id);

    socket.on(
      "handshake",
      (username, callback: (id: string, users: IUser[]) => void) => {
        console.info("USERNAME: " + username);
        console.info("Handshake received from: " + socket.id);

        const reconnectedUser = Object.values(this.users).find(
          (user) => user.id === socket.id
        );

        if (reconnectedUser) {
          console.info("This user has reconnected.");

          const uid = this.GetUidFromSocketID(socket.id);

          if (uid) {
            console.info("Sending callback for reconnect ...");
            this.users[uid].lastSeen = new Date();
            this.users[uid].isOnline = true;
            const users = Object.values(this.users);
            callback(username, users);
            return;
          }
        }

        const uid = v4();
        this.users[uid] = {
          id: socket.id,
          username,
          isOnline: true,
          lastSeen: new Date(),
          joined: new Date(),
        };

        const users = Object.values(this.users);
        console.info("Sending callback ...");
        callback(username, users);

        this.SendMessage(
          "user_connected",
          users.filter((user) => user.id !== socket.id),
          users
        );
      }
    );

    socket.on("disconnect", () => {
      console.info("Disconnect received from: " + socket.id);

      const uid = this.GetUidFromSocketID(socket.id);

      if (uid) {
        delete this.users[uid];

        const users = Object.values(this.users);

        this.SendMessage("user_disconnected", users, socket.id);
      }
    });

    socket.on("message", (message: IMessage) => {
      console.info("message received: ", message);
      this.io.emit("message", message);
    });
  };

  GetUidFromSocketID = (id: string) => {
    return Object.keys(this.users).find((uid) => this.users[uid].id === id);
  };

  SendMessage = (name: string, users: IUser[], payload?: Object) => {
    console.info("Emitting event: " + name + " to", users);
    users.forEach((user) =>
      payload
        ? this.io.to(user.id).emit(name, payload)
        : this.io.to(user.id).emit(name)
    );
  };
}
