import React, { useState, createContext } from "react";
import axios from "axios";
import useRoomsData from "../hooks/useRoomsData";

export const RoomContext = createContext();

const RoomContextProvider = ({ children }) => {
  const [userRoomsData, setUserRoomsData] = useState([]);

  useRoomsData(setUserRoomsData);

  const updateRoomsData = async () => {
    const token = localStorage.getItem("tokenauth");
    setUserRoomsData([]);
    try {
      const result = await axios.get("/get-rooms", {
        withCredentials: true,
        headers: { authorization: `Bearer ${token}` },
      });

      setUserRoomsData(result.data);
    } catch (error) {
      setUserRoomsData([]);
      localStorage.removeItem("tokenauth");
    }
  };

  return (
    <RoomContext.Provider value={{ userRoomsData, updateRoomsData }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomContextProvider;
