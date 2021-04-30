import styled from "styled-components";
import { GrEmoji } from "react-icons/gr";
import { HiOutlinePhotograph } from "react-icons/hi";
import { Link } from "react-router-dom";

export const HomeCenter = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #e8e8f2;
`;

export const MessagesWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
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
  background: #fff;
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
  border: 1px solid #acacac;
  background: none;

  width: 1000px;
  height: 40px;
  background: #fff;
  border-radius: 4px;
  padding: 10px;
  margin: 5px 20px;
  font-size: 14px;
  font-weight: 600;
`;

export const SubmitMessageButton = styled.button`
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;

  color: #fff;
  height: 40px;
  background: royalblue;
  padding: 10px 15px;
  border-radius: 5px;
  margin-left: 15px;
`;

export const SidebarFriends = styled.div`
  width: 25vw;
  height: 100vh;
  background: purple;
`;

export const MessageBox = styled.div`
  display: flex;
  justify-content: ${(props) => (props.otherUser ? "flex-start" : "flex-end")};
  align-items: center;
  margin: 5px 10px;
`;

export const Message = styled.li`
  color: ${(props) => (props.otherUser ? "black" : "#fff")};
  padding: 8px;
  background: ${(props) => (props.otherUser ? "#FFFAFA" : "royalblue")};
  border-radius: 8px;
  margin: 5px 10px;
  font-family: "Roboto", sans-serif;
  max-width: 500px;
  word-break: break-all;
`;

export const MessageUsername = styled.p`
  color: gray;
  font-size: 9px;
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
  color: royalblue;
  cursor: pointer;
`;

export const FileUploadIcon = styled(HiOutlinePhotograph)`
  font-size: 22px;
  color: royalblue;
  margin-left: 15px;
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
