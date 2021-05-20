const handleUserPresenceCheck = () => {
  const isUserInRoom = room.users.includes(req.user.id);
  if (isUserInRoom)
    return res
      .status(400)
      .send({ errorMessage: "You are already in this room", path: "name" });
};
