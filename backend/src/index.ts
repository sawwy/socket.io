import { createServer } from "http";
import { ServerSocket } from "./socket";
import express from "express";

const app = express();

const httpServer = createServer(app);

new ServerSocket(httpServer);

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

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

httpServer.listen(3500, () => console.log("listening on port 3500"));
