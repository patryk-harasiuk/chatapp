import React, { useEffect, useState, useRef } from "react";
import { useUserProvider } from "../../context/UserProvider";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import Picker from "emoji-picker-react";
// import "react-notifications-component/dist/theme.css";
// import { store } from "react-notifications-component";
// import "animate.css/animate.min.css";
import {
  HomeCenter,
  Form,
  InputBox,
  Input,
  SubmitMessageButton,
  MessageBox,
  Message,
  MessageUsername,
  MessageAvatatr,
  ColumnPlacement,
  MessageTimeStamp,
  EmojiIcon,
  MessagesWrapper,
  LoadMoreMessagesIcon,
} from "./ChatRoomStyles";
import Modal from "./Modal";
// import { Room } from "../Sidebar/SidebarStyles";

const ChatRoom = () => {
  const { userData, createRoomPopup, joinRoomPopup } = useUserProvider();

  let { roomId } = useParams();
  const [chatMessages, setChatMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [emojiClick, setEmocjiClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [skipValue, setSkipValue] = useState(35);
  const socketRef = useRef();
  const lastMessageRef = useRef();
  const firstMessageRef = useRef();

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
      setChatMessages(messagesHistory.messages.reverse());
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
      setChatMessages([]);
      console.log("socket disconnectioed");
    };
  }, [roomId]);

  const MessageLoader = () => {
    setLoading(true);
    setError({});

    axios.get("/get-messages", {
      roomId: roomId,
      skipValue: skipValue,
    });
  };

  // console.log(chatMessages.length);
  return (
    <>
      <HomeCenter>
        {/* <LoadMoreMessagesIcon /> */}
        <MessagesWrapper>
          {chatMessages.map((message, index) => {
            const lastMessage = chatMessages.length - 1 === index;
            if (
              message.senderId === socketRef.current.id ||
              userData.username === message.username
            ) {
              return (
                <MessageBox
                  key={index}
                  ref={lastMessage ? lastMessageRef : null}
                >
                  <ColumnPlacement>
                    <MessageUsername>{message.username}</MessageUsername>

                    <Message>
                      {message.body}
                      <MessageTimeStamp>
                        {message.messageTimeStamp}
                      </MessageTimeStamp>
                    </Message>
                  </ColumnPlacement>
                  <MessageAvatatr src={`/${message.userAvatar}`} />
                </MessageBox>
              );
            } else {
              return (
                <MessageBox otherUser key={index}>
                  <MessageAvatatr src={`/${message.userAvatar}`} />
                  <ColumnPlacement>
                    <MessageUsername>{message.username}</MessageUsername>

                    <Message otherUser>
                      {message.body}
                      <MessageTimeStamp>
                        {message.messageTimeStamp}
                      </MessageTimeStamp>
                    </Message>
                  </ColumnPlacement>
                </MessageBox>
              );
            }
          })}
        </MessagesWrapper>
        <Form onSubmit={sendMessage}>
          <InputBox>
            <Input
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

            <EmojiIcon onClick={() => setEmocjiClick(!emojiClick)} />

            <SubmitMessageButton type="submit">Submit</SubmitMessageButton>
          </InputBox>
        </Form>
      </HomeCenter>
      {createRoomPopup || joinRoomPopup ? <Modal /> : null}
    </>
  );
};

export default ChatRoom;
