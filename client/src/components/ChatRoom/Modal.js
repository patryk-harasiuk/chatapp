import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useUserProvider } from "../../context/UserProvider";
import {
  Label,
  RegisterForm,
  InputBox,
  Input,
  ButtonSingUp,
  ErrorInfo,
} from "../RegisterPage/RegisterPageStyles";
import { AiOutlineClose } from "react-icons/ai";

const CreateRoomPopup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 500px;
  height: 450px;
  z-index: 1000;
`;

const CreateRoomForm = styled(RegisterForm)`
  width: 100%;
  height: 100%;
  background: none;
  border-radius: 0;
`;

const CreateRoomButton = styled(ButtonSingUp)`
  width: 200px;
`;

const CloseIcon = styled(AiOutlineClose)`
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  right: 0;
  margin: 5px;
  z-index: 1001;
`;

const Modal = ({ setCreateRoomPopup, setJoinRoomPopup, createRoomPopup }) => {
  const { updateRoomsData } = useUserProvider();
  const [error, setError] = useState({});
  const [roomData, setRoomData] = useState({
    name: "",
    password: "",
  });
  const token = localStorage.getItem("tokenauth");

  const createRoomHandler = async (e) => {
    e.preventDefault();
    setError({});

    await axios
      .post(
        "/create-room",
        {
          name: roomData.name,
          password: roomData.password,
        },
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setRoomData({ name: "", password: "" });
        setError({});
        updateRoomsData();
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    setError({});

    // await axios.post(
    //   '/join-room'
    // )
  };

  const closeCreateRoomPopup = () => {
    setCreateRoomPopup(false);
  };

  const closeJoinRoomPopup = () => {
    setJoinRoomPopup(false);
  };

  return (
    <CreateRoomPopup>
      <CloseIcon
        onClick={createRoomPopup ? closeCreateRoomPopup : closeJoinRoomPopup}
      />
      <CreateRoomForm onSubmit={createRoomHandler}>
        <InputBox>
          <Input
            type="text"
            name="roomName"
            required="required"
            autoComplete="off"
            value={roomData.name}
            onChange={(e) =>
              setRoomData({
                ...roomData,
                name: e.target.value,
              })
            }
          />
          {error.path === "name" ? (
            <ErrorInfo>{error.errorMessage}</ErrorInfo>
          ) : null}
          <Label htmlFor="roomName">Room name</Label>
        </InputBox>
        <InputBox>
          <Input
            type="password"
            name="roomPassword"
            required="required"
            autoComplete="off"
            value={roomData.password}
            onChange={(e) =>
              setRoomData({
                ...roomData,
                password: e.target.value,
              })
            }
          />
          {error.path === "password" ? (
            <ErrorInfo>{error.errorMessage}</ErrorInfo>
          ) : null}
          <Label htmlFor="roomPassword">Room password</Label>
        </InputBox>
        <CreateRoomButton type="submit">
          {createRoomPopup ? "Create" : "Join"}
        </CreateRoomButton>
      </CreateRoomForm>
    </CreateRoomPopup>
  );
};

export default Modal;
