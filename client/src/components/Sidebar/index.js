import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { useUserProvider } from "../../context/UserProvider";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "animate.css/animate.min.css";
import * as S from "./SidebarStyles";

const Sidebar = () => {
  const {
    userData,
    userRoomsData,
    updateRoomsData,
    createRoomClicker,
    joinRoomClicker,
    setUserData,
  } = useUserProvider();

  const history = useHistory();
  const token = localStorage.getItem("tokenauth");
  const [activeClick, setActiveClick] = useState(() => {
    return localStorage.getItem("activityStatus")
      ? JSON.parse(localStorage.getItem("activityStatus"))
      : true;
  });

  useEffect(() => {
    axios
      .get("/auth", {
        withCredentials: true,
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        setUserData({});
        localStorage.removeItem("tokenauth");
        history.push("/login");
      });
  }, []);

  useEffect(() => {
    updateRoomsData();
  }, []);

  const activityStatusHandler = () => {
    setActiveClick(!activeClick);
    localStorage.setItem("activityStatus", JSON.stringify(!activeClick));
  };

  const copyIdHandler = () => {
    store.addNotification({
      message: "Room id copied to clipboard",
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
  };

  return (
    <S.SidebarRooms>
      <S.ProfileCard>
        <S.ProfileCardInfoWrapper>
          <S.ProfileCardImage src={`/${userData.userAvatar}`} />
          <S.ProfileName>{userData.username}</S.ProfileName>
          <S.ActivityCheckbox
            type="checkbox"
            name="checkbox"
            onChange={activityStatusHandler}
            checked={activeClick ? false : true}
          />
          <S.Label
            htmlFor="checkbox"
            style={activeClick ? { color: "#3ba55c" } : { color: "#e74c3c" }}
          >
            {activeClick ? "Active" : "Away"}
          </S.Label>
          <S.SettingsLink to="/settings">
            <S.SettingsIcon />
          </S.SettingsLink>
        </S.ProfileCardInfoWrapper>
      </S.ProfileCard>

      <S.SidebarRoomsNav>
        <S.ChatRoomsText>Chat rooms</S.ChatRoomsText>

        <S.RoomButton onClick={createRoomClicker}>Create room</S.RoomButton>
        <S.RoomButton onClick={joinRoomClicker}>Join room</S.RoomButton>
      </S.SidebarRoomsNav>
      <S.RoomList>
        {userRoomsData.length !== 0
          ? userRoomsData.map((room, index) => {
              return (
                <S.Room key={index}>
                  <S.RoomName to={`/room/${room._id}`}>{room.name}</S.RoomName>
                  <CopyToClipboard text={room._id} onCopy={copyIdHandler}>
                    <S.GetIdIcon />
                  </CopyToClipboard>
                </S.Room>
              );
            })
          : null}
      </S.RoomList>
    </S.SidebarRooms>
  );
};

export default Sidebar;
