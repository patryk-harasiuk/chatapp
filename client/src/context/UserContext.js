import React, { useState, createContext, useMemo } from "react";
import axios from "axios";
import useUserData from "../hooks/useUserData";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  useUserData(setUserData);

  const updateUserData = async () => {
    console.log("fire 2");
    const token = localStorage.getItem("tokenauth");
    if (token === null) {
      setUserData({});
    } else {
      try {
        const result = await axios.get("/auth", {
          withCredentials: true,
          headers: { authorization: `Bearer ${token}` },
        });

        setUserData(result.data);
      } catch (error) {
        setUserData({});
        localStorage.removeItem("tokenauth");
      }
    }
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
