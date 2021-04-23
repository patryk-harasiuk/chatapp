const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const cors = require("cors");
const socket = require("socket.io");
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

app.use("/", routes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`server is running on ${PORT}`)
);

const io = socket(server);

io.on("connection", (socket) => {
  socket.emit("your id", socket.id);
  socket.on("send message", (body) => {
    io.emit("message", body);
  });
});
