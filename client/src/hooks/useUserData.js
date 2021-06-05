import { useEffect } from "react";
import axios from "axios";

const useUserData = (setUserData, setError) => {
  useEffect(() => {
    const updateUserData = async () => {
      const token = localStorage.getItem("tokenauth");
      if (!token) setUserData({});

      try {
        const result = await axios.get("/auth", {
          withCredentials: true,
          headers: { authorization: `Bearer ${token}` },
        });

        await setUserData(result.data);
      } catch (error) {
        setUserData({});
        setError({ errorMessage: "Error occured during your authorization" });
        localStorage.removeItem("tokenauth");
      }
    };
    updateUserData();
  }, [setUserData]);
};

export default useUserData;
