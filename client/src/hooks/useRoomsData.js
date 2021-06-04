import { useEffect } from "react";
import axios from "axios";

const useRoomsData = (setUserRoomsData) => {
  useEffect(() => {
    const updateRoomsData = async () => {
      const token = localStorage.getItem("tokenauth");
      setUserRoomsData([]);
      try {
        const result = await axios.get("/get-rooms", {
          withCredentials: true,
          headers: { authorization: `Bearer ${token}` },
        });

        await setUserRoomsData(result.data);
        await console.log("roomfunction");
      } catch (error) {
        console.log(error);
        setUserRoomsData([]);
        localStorage.removeItem("tokenauth");
      }
    };
    updateRoomsData();
  }, [setUserRoomsData]);
};

export default useRoomsData;
