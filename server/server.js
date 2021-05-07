const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const socket = require("socket.io");
const io = socket(server, {
  cors: true,
  origins: ["localhost:5000"],
});
const fileUpload = require("express-fileupload");
const Message = require("./model/messageModel");
const Room = require("./model/roomModel");
const createMessage = require("./services/createMessage");
const getMessagesWithPopulate = require("./services/getMessages");

mongoose
  .connect("mongodb://localhost:27017/chat_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to the database");
  })
  .catch((err) => {
    console.log("cannot connect to the database", err);
    process.exit();
  });

app.use(express.json());

app.use(
  fileUpload({
    limits: { fileSize: 16000000 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(cors());

io.on("connection", async (socket) => {
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  try {
    const messagesHistory = await getMessagesWithPopulate(roomId);
    socket.emit("message-history", messagesHistory);
  } catch (error) {
    console.log(error);
  }

  socket.on("send-message", async (body) => {
    // console.log(body);
    try {
      await createMessage(roomId, {
        body: body.body,
        username: body.username,
        userAvatar: body.userAvatar,
        date: Date.now(),
      });

      io.in(roomId).emit("send-message", body);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

app.use("/", routes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server is running on ${PORT}`));
