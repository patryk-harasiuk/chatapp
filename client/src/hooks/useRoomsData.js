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

        setUserRoomsData(result.data);
      } catch (error) {
        setUserRoomsData([]);
        localStorage.removeItem("tokenauth");
      }
    };
    updateRoomsData();
  }, [setUserRoomsData]);
};

export default useRoomsData;
