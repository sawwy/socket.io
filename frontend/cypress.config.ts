import { defineConfig } from "cypress";
import { Socket, io } from "socket.io-client";
import { MessageTypeEnum } from "./app/enums";

let socket: Socket;

export default defineConfig({
  e2e: {
    // setupNodeEvents(on, config) {
    // implement node event listeners here
    // },
    baseUrl: "http://localhost:5173/",
    setupNodeEvents(on, config) {
      on("task", {
        handshake(name) {
          console.log(
            "Cypress is connecting to socket server under name %s",
            name
          );
          socket = io("http://localhost:3500");

          socket.emit("handshake", name);

          return null;
        },
        say({ username, message }) {
          const newMessage = {
            type: MessageTypeEnum.UserMessage,
            timestamp: new Date(),
            user: {
              id: socket.id,
              isOnline: true,
              lastSeen: new Date(),
              joined: new Date(),
              username,
            },
            message,
          };

          socket.emit("message", newMessage);
          return null;
        },
        disconnect() {
          socket.disconnect();

          return null;
        },
      });
    },
  },
});
