import styled from "styled-components";
import { GrEmoji } from "react-icons/gr";
import { BsTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export const HomeCenter = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #36393f;
`;

export const ChatNav = styled.nav`
  width: 100%;
  min-height: 50px;
  background: #36393f;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;

  /* -webkit-box-shadow: 0px 1px 9px 3px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 1px 9px 3px rgba(0, 0, 0, 0.75); */
`;

export const RoomName = styled.p`
  font-size: 16px;
  color: #fff;
  padding-left: 25px;
  font-weight: 600;
`;

export const MessagesWrapper = styled.div`
  flex: 1;
  width: 100%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-top: 10px;

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #38404c;
  }

  ::-webkit-scrollbar {
    width: 10px;
    background-color: #38404c;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #212121;
  }
`;

export const Form = styled.form`
  width: 100%;
`;

export const InputBox = styled.div`
  background: #202225;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 75px;
  margin: 10px 20px;
  border-radius: 4px;
  -webkit-box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.3);
  box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.3);
`;

export const Input = styled.input`
  appearance: none;
  outline: none;
  border: none;
  background: #36393f;

  width: 1000px;
  height: 40px;
  color: #fff;
  border-radius: 4px;
  padding: 10px;
  margin: 5px 20px;
  font-size: 14px;
  transition: 0.2s ease-out;

  &:focus {
    box-shadow: 0 0 2px 1px #3ba55c;
  }
`;

export const SubmitMessageButton = styled.button`
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  background: #3ba55c;

  color: #fff;
  height: 40px;
  padding: 10px 15px;
  border-radius: 5px;
  margin-left: 15px;
`;

// export const SidebarFriends = styled.div`
//   width: 25vw;
//   height: 100vh;
//   background: purple;
// `;

export const MessageBox = styled.div`
  display: flex;
  justify-content: ${(props) => (props.otherUser ? "flex-start" : "flex-end")};
  align-items: center;
  margin: 5px 10px;

  &:first-child {
    margin-top: auto;
  }
`;

export const Message = styled.li`
  color: #fff;
  padding: 8px;
  background: ${(props) => (props.otherUser ? "#676063" : "#7289da")};
  border-radius: 8px;
  margin: 5px 10px;
  font-family: "Roboto", sans-serif;
  max-width: 500px;
  word-break: break-all;
`;

export const MessageUsername = styled.p`
  color: #fff;
  font-size: 8px;
  transform: translateX(15px);
`;

export const MessageAvatatr = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 15px;
`;

export const ColumnPlacement = styled.div`
  flex-direction: column;
`;

export const MessageTimeStamp = styled.span`
  font-size: xx-small;
  margin-left: 10px;
`;

export const EmojiIcon = styled(GrEmoji)`
  font-size: 22px;
  color: #3ba55c;
  cursor: pointer;
`;

export const JoinGlobalRoomButton = styled(Link)`
  appearance: none;
  outline: none;
  cursor: pointer;
  border: none;
  width: 50px;
  height: 50px;
  background: royalblue;
`;

export const LoadingMessage = styled.span`
  font-size: 14px;
  color: #3ba55c;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(50%, 50%);
`;

export const TrashIcon = styled(BsTrashFill)`
  font-size: 22px;
  color: #3ba55c;
`;
