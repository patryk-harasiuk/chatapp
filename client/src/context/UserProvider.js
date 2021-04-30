import React, { useState, useContext } from "react";
import axios from "axios";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [userRoomsData, setUserRoomsData] = useState([]);
  const [createRoomPopup, setCreateRoomPopup] = useState(false);
  const [joinRoomPopup, setJoinRoomPopup] = useState(false);
  const token = localStorage.getItem("tokenauth");

  const createRoomClicker = () => {
    setCreateRoomPopup(true);
    setJoinRoomPopup(false);
  };

  const joinRoomClicker = () => {
    setJoinRoomPopup(true);
    setCreateRoomPopup(false);
  };

  const updateUserData = async () => {
    if (token === null) {
      setUserData({});
    } else {
      await axios
        .get("auth/user", {
          withCredentials: true,
          headers: { authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          setUserData({});
          localStorage.removeItem("tokenauth");
        });
    }
  };

  const updateRoomsData = async () => {
    setUserRoomsData([]);
    await axios
      .get("/get-rooms", {
        withCredentials: true,
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserRoomsData(response.data);
      })
      .catch((error) => {
        setUserRoomsData({});
      });
  };

  return (
    <UserContext.Provider
      value={{
        createRoomPopup,
        joinRoomPopup,
        createRoomClicker,
        joinRoomClicker,
        userData,
        setUserData,
        updateUserData,
        updateRoomsData,
        userRoomsData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider };
