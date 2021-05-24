import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
import axios from "axios";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
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

  // const updateUserData = () => {
  //   const token = localStorage.getItem("tokenauth");
  //   if (token === null) {
  //     setUserData({});
  //   } else {
  //     axios
  //       .get("/auth", {
  //         withCredentials: true,
  //         headers: { authorization: `Bearer ${token}` },
  //       })
  //       .then((response) => {
  //         setUserData(response.data);
  //       })
  //       .catch((error) => {
  //         setUserData({});
  //       });
  //   }
  // };

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
        setUserRoomsData([]);
      });
  };

  return (
    <UserContext.Provider
      value={{
        createRoomPopup,
        joinRoomPopup,
        setCreateRoomPopup,
        setJoinRoomPopup,
        createRoomClicker,
        joinRoomClicker,
        userData,
        setUserData,
        // updateUserData,
        updateRoomsData,
        userRoomsData,
        handleModalClose,
        isOnline,
        setIsOnline,
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
