import { createServer } from "http";
import { ServerSocket } from "./socket";
import express from "express";

const app = express();

const httpServer = createServer(app);

const serverSocket = new ServerSocket(httpServer);

/** Log the request */
app.use((req, res, next) => {
  console.info(
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    console.info(
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

app.get("/flushUsers", (req, res) => {
  serverSocket.users = {};
  res.sendStatus(200);
});

app.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

httpServer.listen(3500, () => console.log("listening on port 3500"));
