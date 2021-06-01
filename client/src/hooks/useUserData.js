import { useEffect } from "react";
import axios from "axios";

const useUserData = (setUserData) => {
  useEffect(() => {
    console.log("fire 1");
    const updateUserData = async () => {
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
          console.log(error);
          setUserData({});
          localStorage.removeItem("tokenauth");
        }
      }
    };
    updateUserData();
  }, [setUserData]);
};

export default useUserData;
