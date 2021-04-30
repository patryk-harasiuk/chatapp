import React, { useState, useEffect } from "react";
import { useUserProvider } from "../../context/UserProvider";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "animate.css/animate.min.css";
import {
  SidebarRooms,
  ProfileCard,
  ProfileCardInfoWrapper,
  ProfileCardImage,
  ProfileName,
  ActivityCheckbox,
  Label,
  SettingsLink,
  SettingsIcon,
  SidebarRoomsNav,
  RoomButton,
  ChatRoomsText,
  RoomList,
  Room,
  RoomName,
  GetIdIcon,
} from "./SidebarStyles";

const Sidebar = () => {
  const {
    userData,
    userRoomsData,
    updateRoomsData,
    createRoomClicker,
    joinRoomClicker,
  } = useUserProvider();
  const [activeClick, setActiveClick] = useState(() => {
    return localStorage.getItem("activityStatus")
      ? JSON.parse(localStorage.getItem("activityStatus"))
      : true;
  });

  useEffect(() => {
    updateRoomsData();
  }, []);

  const activityStatusHandler = () => {
    setActiveClick(!activeClick);
    localStorage.setItem("activityStatus", JSON.stringify(!activeClick));
  };

  // const createRoomClicker = () => {
  //   setCreateRoomPopup(true);
  //   setJoinRoomPopup(false);
  // };

  // const joinRoomClicker = () => {
  //   setJoinRoomPopup(true);
  //   setCreateRoomPopup(false);
  // };

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
    <SidebarRooms>
      <ProfileCard>
        <ProfileCardInfoWrapper>
          <ProfileCardImage src={userData.userAvatar} />
          <ProfileName>{userData.username}</ProfileName>
          <ActivityCheckbox
            type="checkbox"
            name="checkbox"
            onChange={activityStatusHandler}
            checked={activeClick ? false : true}
          />
          <Label
            htmlFor="checkbox"
            style={activeClick ? { color: "#27ae60" } : { color: "#e74c3c" }}
          >
            {activeClick ? "Active" : "Away"}
          </Label>
          <SettingsLink to="/settings">
            <SettingsIcon />
          </SettingsLink>
        </ProfileCardInfoWrapper>
      </ProfileCard>

      <SidebarRoomsNav>
        <ChatRoomsText>Chat rooms</ChatRoomsText>

        <RoomButton onClick={createRoomClicker}>Create room</RoomButton>
        <RoomButton onClick={joinRoomClicker}>Join room</RoomButton>
      </SidebarRoomsNav>
      <RoomList>
        {userRoomsData.length !== 0
          ? userRoomsData.map((room, index) => {
              return (
                <Room key={index} to={`/room/${room._id}`}>
                  <RoomName>{room.name}</RoomName>
                  <CopyToClipboard text={room._id} onCopy={copyIdHandler}>
                    <GetIdIcon />
                  </CopyToClipboard>
                </Room>
              );
            })
          : null}
      </RoomList>
    </SidebarRooms>
  );
};

export default Sidebar;
