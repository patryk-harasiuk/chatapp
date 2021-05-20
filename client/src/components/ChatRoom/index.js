import React, { useEffect, useState, useRef, useCallback } from "react";
import { useUserProvider } from "../../context/UserProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import Picker from "emoji-picker-react";
import * as S from "./ChatRoomStyles";

const ChatRoom = () => {
  const { userData, userRoomsData } = useUserProvider();

  let { roomId } = useParams();
  const [chatMessages, setChatMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [emojiClick, setEmocjiClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [pageIndex, setPageIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [currentRoomData, setCurrentRoomData] = useState({});
  const socketRef = useRef();
  const observer = useRef();
  const lastMessageRef = useRef();
  const MESSAGES_LENGTH = 35;

  useEffect(() => {
    if (chatMessages.length >= MESSAGES_LENGTH) {
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

  const firstMessageRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageIndex((prevState) => prevState + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (lastMessageRef.current)
      return lastMessageRef.current.scrollIntoView({ smooth: true });
  }, [chatMessages]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!chatMessage || !chatMessage.trim()) return;

    const messageObject = {
      body: chatMessage,
      senderId: socketRef.current.id,
      username: userData.username,
      userAvatar: userData.userAvatar,
      messageTimeStamp: new Date().toLocaleTimeString(),
    };
    setChatMessage("");
    socketRef.current.emit("send-message", messageObject);
  };

  const onEmojiClick = (e, emojiObject) => {
    setChatMessage((prevState) => prevState + emojiObject.emoji);
  };

  useEffect(() => {
    socketRef.current = io("http://localhost:5000", {
      query: { roomId },
    });

    socketRef.current.on("message-history", (messagesHistory) => {
      const sortByDate = messagesHistory.messages.sort((a, b) => {
        return a.createdAt.localeCompare(b.createdAt);
      });
      setChatMessages(sortByDate);
    });

    socketRef.current.on("send-message", (message) => {
      const incomingMessage = {
        ...message,
        isOwner: message.senderId === socketRef.current.id,
      };
      setChatMessages((prevState) => [...prevState, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
      setPageIndex(0);
      setChatMessages([]);
    };
  }, [roomId]);

  useEffect(() => {
    if (userRoomsData.length) {
      setCurrentRoomData(userRoomsData.find((room) => room._id === roomId));
    }
  }, [userRoomsData, roomId]);

  return (
    <S.HomeCenter>
      <S.ChatNav>
        <S.RoomName>{currentRoomData.name}</S.RoomName>
        <S.ChatNavIconsWrapper>
          <S.RoomUsersIcon />
          {currentRoomData.ownerId === userData._id ? <S.TrashIcon /> : null}
        </S.ChatNavIconsWrapper>
      </S.ChatNav>
      <S.MessagesWrapper>
        {loading ? <S.LoadingMessage>Loading...</S.LoadingMessage> : null}
        {chatMessages.map((message, index) => {
          const lastMessage = chatMessages.length - 1 === index;
          if (
            message.senderId === socketRef.current.id ||
            userData.username === message.username
          ) {
            return (
              <S.MessageBox
                key={index}
                ref={lastMessage ? lastMessageRef : null}
              >
                <S.ColumnPlacement>
                  <S.MessageUsername>{message.username}</S.MessageUsername>

                  <S.Message ref={index === 0 ? firstMessageRef : null}>
                    {message.body}
                    <S.MessageTimeStamp>
                      {message.messageTimeStamp}
                    </S.MessageTimeStamp>
                  </S.Message>
                </S.ColumnPlacement>
                <S.MessageAvatatr src={`/${message.userAvatar}`} />
              </S.MessageBox>
            );
          } else {
            return (
              <S.MessageBox otherUser key={index}>
                <S.MessageAvatatr src={`/${message.userAvatar}`} />
                <S.ColumnPlacement>
                  <S.MessageUsername>{message.username}</S.MessageUsername>

                  <S.Message
                    otherUser
                    ref={index === 0 ? firstMessageRef : null}
                  >
                    {message.body}
                    <S.MessageTimeStamp>
                      {message.messageTimeStamp}
                    </S.MessageTimeStamp>
                  </S.Message>
                </S.ColumnPlacement>
              </S.MessageBox>
            );
          }
        })}
      </S.MessagesWrapper>
      <S.Form onSubmit={sendMessage}>
        <S.InputBox>
          <S.Input
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Aa..."
            spellCheck="false"
          />
          <Picker
            pickerStyle={
              emojiClick
                ? {
                    position: "fixed",
                    bottom: "90px",
                  }
                : { display: "none" }
            }
            onEmojiClick={onEmojiClick}
            disableAutoFocus={true}
          />

          <S.EmojiIcon onClick={() => setEmocjiClick(!emojiClick)} />

          <S.SubmitMessageButton type="submit">Submit</S.SubmitMessageButton>
        </S.InputBox>
      </S.Form>
    </S.HomeCenter>
  );
};

export default ChatRoom;
