import styled from "styled-components";
import { IoMdSettings } from "react-icons/io";
import { IoCopy } from "react-icons/io5";
import { Link } from "react-router-dom";

export const SidebarRooms = styled.div`
  width: 450px;
  height: 100vh;
  background-color: #2f3136;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ProfileCard = styled.div`
  height: 300px;
  width: 250px;
  background: rgb(79, 84, 92, 0.32);
  margin-top: 50px;
  border-radius: 15px;
  -webkit-box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.5);
`;

export const ProfileCardInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ProfileCardImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-top: 25px;
  object-fit: cover;
`;

export const ProfileName = styled.h3`
  padding-top: 10px;
  color: #fff;
`;

export const ActivityCheckbox = styled.input`
  width: 40px;
  height: 20px;
  margin-top: 5px;
  appearance: none;
  background: #3ba55c;
  outline: none;
  border-radius: 20px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  transition: 0.3s ease-out;

  &:checked {
    background: #e74c3c;
  }

  &::before {
    content: "";
    position: absolute;
    width: 21px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    transform: scale(1.1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: 0.3s ease-in-out;
  }

  &:checked::before {
    transform: translateX(20px);
  }
`;

export const Label = styled.label`
  font-size: 12px;
  margin-top: 5px;
  font-weight: 600;
`;

export const SettingsIcon = styled(IoMdSettings)`
  font-size: 22px;
  margin-top: 10px;
  color: #3ba55c;
`;

export const SettingsLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export const SidebarRoomsNav = styled.nav`
  height: 200px;
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
`;

export const ChatRoomsText = styled.h3`
  font-size: 22px;
  color: #fff;
`;

export const RoomButton = styled.button`
  outline: none;
  border: none;
  appearance: none;
  cursor: pointer;

  width: 175px;
  height: 50px;
  background: rgb(79, 84, 92, 0.32);
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 16px;
  background-size: 200%;
  transition: 0.3s ease-out;
  margin-top: 10px;

  &:hover {
    background: #7289da;
  }
`;

export const RoomList = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  margin-top: 30px;
  overflow-y: auto;

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    background-color: #38404c;
  }

  ::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #212121;
  }
`;

export const Room = styled.div`
  min-height: 70px;
  width: 100%;
  background: #40444b;
  text-decoration: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.2s ease-in-out;

  &:hover {
    background: rgb(54 57 63);
  }
`;

export const RoomName = styled(Link)`
  margin-left: 20px;
  text-decoration: none;
  color: #fff;
`;

export const GetIdIcon = styled(IoCopy)`
  cursor: pointer;
  font-size: 24px;
  color: #3ba55c;
  margin-right: 5px;
`;
