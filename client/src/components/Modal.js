import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { useUserProvider } from "../context/UserProvider";
import { RoomContext } from "../context/RoomContext";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "animate.css/animate.min.css";
import {
  Label,
  RegisterForm,
  InputBox,
  Input,
  ButtonSingUp,
  ErrorInfo,
} from "./RegisterPage/RegisterPageStyles";
import { AiOutlineClose } from "react-icons/ai";

const CreateRoomPopup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #202225;
  width: 450px;
  height: 520px;
  z-index: 10000;
  pointer-events: all;
  opacity: 1;
  border-radius: 6px;
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
  font-size: 28px;
  color: #3ba55c;
  position: absolute;
  right: 0;
  margin: 14px;
  z-index: 1001;
`;

const Modal = () => {
  const {
    setCreateRoomPopup,
    setJoinRoomPopup,
    createRoomPopup,
    joinRoomPopup,
  } = useUserProvider();
  const { updateRoomsData } = useContext(RoomContext);
  const [error, setError] = useState({});
  const [roomData, setRoomData] = useState({
    name: "",
    password: "",
  });
  const token = localStorage.getItem("tokenauth");
  const closePopupRef = useRef();

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
      .then(async (response) => {
        setRoomData({ name: "", password: "" });
        setError({});
        await updateRoomsData();

        store.addNotification({
          message: "Successfully created room",
          type: "success",
          container: "top-right",
          insert: "top",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  const joinRoomHandler = async (e) => {
    e.preventDefault();
    setError({});

    await axios
      .post(
        "/join-room",
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

        store.addNotification({
          message: "You were added to the room",
          type: "success",
          container: "top-right",
          insert: "top",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  const handleClosePopup = () => {
    setCreateRoomPopup(false);
    setJoinRoomPopup(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (closePopupRef.current && !closePopupRef.current.contains(e.target)) {
        setCreateRoomPopup(false);
        setJoinRoomPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closePopupRef, setJoinRoomPopup, setCreateRoomPopup]);

  return (
    <CreateRoomPopup ref={closePopupRef}>
      <CloseIcon
        onClick={createRoomPopup || joinRoomPopup ? handleClosePopup : null}
      />
      <CreateRoomForm
        onSubmit={createRoomPopup ? createRoomHandler : joinRoomHandler}
      >
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
          <Label htmlFor="roomName">
            {createRoomPopup ? "Room name" : "Room ID"}
          </Label>
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
