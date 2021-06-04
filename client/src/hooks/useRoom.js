import { useEffect, useRef } from "react";
import io from "socket.io-client";

const useRoom = (roomId, setChatMessages, setPageIndex) => {
  const socketRef = useRef();
  const SERVER_ADRESS = "http://localhost:5000";

  useEffect(() => {
    socketRef.current = io(SERVER_ADRESS, {
      query: { roomId },
    });

    socketRef.current.on("message-history", (messagesHistory) => {
      const sortByDate = messagesHistory.messages.sort((a, b) => {
        return a.createdAt.localeCompare(b.createdAt);
      });
      setChatMessages(sortByDate);
      console.log("jope");
    });

    socketRef.current.on("send-message", (message) => {
      const incomingMessage = {
        ...message,
        isOwner: message.senderId === socketRef.current.id,
      };

      setChatMessages((prevState) => [...prevState, incomingMessage]);
    });

    return () => {
      setPageIndex(0);
      setChatMessages([]);
      socketRef.current.disconnect();
    };
  }, [roomId, setChatMessages, setPageIndex]);
  return { socketRef };
};

export default useRoom;
