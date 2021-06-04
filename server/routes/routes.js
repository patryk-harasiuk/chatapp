const router = require("express").Router();
const User = require("../model/user");
const Room = require("../model/roomModel");
const bcrypt = require("bcrypt");

const addUserToRoom = require("../services/room");
const addRoomToUser = require("../services/user");
const getRoomsWithPopulate = require("../services/getRooms");
const getMoreMessages = require("../services/getMoreMessages");
const handleEmailDuplicate = require("../services/register/emailDuplicate");
const handlePasswordHash = require("../services/passwordHash");
const handleUsernameDuplicate = require("../services/register/usernameDuplicate");
const handleUserExists = require("../services/login/emailCheck");
const handlePasswordCheck = require("../services/login/passwordCompare");
const handleTokenGenerate = require("../services/login/tokenGenerate");

const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
  createRoomValidation,
} = require("../validation/validation");
const authToken = require("./verifyToken");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

router.post("/register", async (req, res) => {
  const { username, password: plainTextPassword, email } = req.body;

  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).send({
      errorMessage: error.details[0].message,
      path: error.details[0].path[0],
    });

  const user = new User({
    username: await handleUsernameDuplicate(username, res),
    password: await handlePasswordHash(plainTextPassword),
    email: await handleEmailDuplicate(email, res),
  });
  try {
    const result = await user.save();
    const { __v, userAvatar, password, ...data } = await result.toJSON();
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  const { error } = loginValidation(req.body);
  if (error)
    return res.status(400).send({
      errorMessage: error.details[0].message,
      path: error.details[0].path[0],
    });

  const userExists = await User.findOne({ email: email });
  handleUserExists(userExists);
  await handlePasswordCheck(password, userExists.password, res);

  res.send({ accessToken: handleTokenGenerate(userExists._id) });
});

router.get("/auth", authToken, async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.user.id });
    const { __v, password, ...data } = await userData._doc;
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/settings", authToken, async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return res.status(400).send({ errorMessage: "No file was uploaded" });

  const file = req.files.file;
  file.name = uuidv4() + file.name;

  file.mv(
    `${__dirname}/../../client/public/uploads/${file.name}`,
    async (err) => {
      if (err) {
        res.status(500).send(err);
      }

      const filePath = `/uploads/${file.name}`;

      try {
        await User.findOneAndUpdate(
          { _id: req.user.id },
          { userAvatar: filePath },
          async (err, result) => {
            if (err) return res.status(500).send(err);

            const { userAvatar } = await result;
            res.send(userAvatar);
          }
        );
      } catch (err) {
        res.status(400).send(err);
      }
    }
  );
});

router.post("/create-room", authToken, async (req, res) => {
  const { name, password } = req.body;

  const { error } = createRoomValidation(req.body);
  if (error)
    return res.status(400).send({
      errorMessage: error.details[0].message,
      path: error.details[0].path[0],
    });

  const room = new Room({
    name,
    password: await handlePasswordHash(password),
    ownerId: req.user.id,
    users: [],
  });
  try {
    const result = await room.save();
    const updatedRoom = await addUserToRoom(req.user.id, result._id);
    await addRoomToUser(req.user.id, result._id);
    const { password, __v, _id, ...data } = await updatedRoom.toJSON();
    data.id = _id;
    res.status(201).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/get-rooms", authToken, async (req, res) => {
  try {
    const roomData = await getRoomsWithPopulate(req.user.id);
    res.status(200).send(roomData.rooms);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/join-room", authToken, async (req, res) => {
  const { name, password } = req.body;

  const room = await Room.findById({ _id: name }, (err) => {
    if (err)
      return res
        .status(400)
        .send({ errorMessage: "Room is not found", path: "name" });
  });

  const validPassword = await bcrypt.compare(password, room.password);
  if (!validPassword)
    return res
      .status(400)
      .send({ errorMessage: "Password is wrong", path: "password" });

  const isUserInRoom = await room.users.includes(req.user.id);
  if (isUserInRoom)
    return res
      .status(400)
      .send({ errorMessage: "You are already in this room", path: "name" });
  try {
    await addUserToRoom(req.user.id, room._id);
    await addRoomToUser(req.user.id, room._id);
    res.send({ statusMessage: "You were added to the room" });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/get-messages", async (req, res) => {
  const { roomId, pageIndex } = req.query;

  try {
    const oldMessages = await getMoreMessages(roomId, pageIndex);
    res.send(oldMessages.messages);
  } catch (error) {
    res
      .status(400)
      .send({ errorMessage: "There was an error retrieving your messages" });
  }
});

module.exports = router;
