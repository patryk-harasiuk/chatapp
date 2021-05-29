import React from "react";
import Sidebar from "./Sidebar";
import ChatRoom from "./ChatRoom";
import styled from "styled-components";

const RoomWrapper = styled.div`
  display: flex;
`;

const ChatComponent = () => {
  return (
    <RoomWrapper>
      <Sidebar />
      <ChatRoom />
    </RoomWrapper>
  );
};

export default ChatComponent;
