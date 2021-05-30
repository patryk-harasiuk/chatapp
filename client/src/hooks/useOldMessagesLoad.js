import { useState, useEffect } from "react";
import axios from "axios";

const useOldMessagesLoad = (
  messagesLength,
  roomId,
  pageIndex,
  setChatMessages
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const MAX_MESSAGES_LENGTH = 35;
  useEffect(() => {
    if (messagesLength >= MAX_MESSAGES_LENGTH) {
      setLoading(true);
      setError({});
      axios
        .get("/get-messages", {
          params: {
            roomId: roomId,
            pageIndex: pageIndex,
          },
        })
        .then((response) => {
          setLoading(false);
          const sortByDate = response.data.sort((a, b) => {
            return a.createdAt.localeCompare(b.createdAt);
          });

          setChatMessages((prevState) => {
            return [...sortByDate, ...prevState];
          });
          setHasMore(response.data.length > 0);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setError(error);
        });
    }
  }, [pageIndex]);
  return { loading, error, hasMore };
};

export default useOldMessagesLoad;
