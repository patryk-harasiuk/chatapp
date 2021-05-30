import React, { useState, useContext } from "react";
import axios from "axios";

const AppContext = React.createContext();

const UserProvider = ({ children }) => {
  const [userRoomsData, setUserRoomsData] = useState([]);
  const [createRoomPopup, setCreateRoomPopup] = useState(false);
  const [joinRoomPopup, setJoinRoomPopup] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  const createRoomClicker = () => {
    setCreateRoomPopup(true);
    setJoinRoomPopup(false);
  };

  const joinRoomClicker = () => {
    setJoinRoomPopup(true);
    setCreateRoomPopup(false);
  };

  const handleModalClose = () => {
    setJoinRoomPopup(false);
    setCreateRoomPopup(false);
  };

  const updateRoomsData = () => {
    const token = localStorage.getItem("tokenauth");
    setUserRoomsData([]);
    axios
      .get("/get-rooms", {
        withCredentials: true,
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserRoomsData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setUserRoomsData([]);
      });
  };

  return (
    <AppContext.Provider
      value={{
        createRoomPopup,
        joinRoomPopup,
        setCreateRoomPopup,
        setJoinRoomPopup,
        createRoomClicker,
        joinRoomClicker,
        updateRoomsData,
        userRoomsData,
        handleModalClose,
        isOnline,
        setIsOnline,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useUserProvider = () => {
  return useContext(AppContext);
};

export { AppContext, UserProvider };
