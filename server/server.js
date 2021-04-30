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
    // abortOnLimit: true,
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(cors());

const room = "general";

io.on("connection", (socket) => {
  socket.join(room);

  socket.on("send-message", (body) => {
    io.in(room).emit("send-message", body);
  });

  socket.on("disconnect", () => {
    socket.leave(room);
  });

  // socket.emit("your id", socket.id);
  // socket.on("send message", (body) => {
  //   io.emit("message", body);
  // });
});

app.use("/", routes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server is running on ${PORT}`));
