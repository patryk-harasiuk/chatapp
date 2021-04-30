import React, { useState, useContext } from "react";
import axios from "axios";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [userRoomsData, setUserRoomsData] = useState([]);
  const token = localStorage.getItem("tokenauth");
  console.log(userRoomsData);
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
