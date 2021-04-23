import styled from "styled-components";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";

export const SidebarRooms = styled.div`
  width: 450px;
  height: 100vh;
  background: whitesmoke;
  border-right: 1px solid #acacac;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ProfileCard = styled.div`
  height: 300px;
  width: 250px;
  background: #e8e8f2;
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
`;

export const ActivityCheckbox = styled.input`
  width: 40px;
  height: 20px;
  margin-top: 5px;
  appearance: none;
  background: #2ecc71;
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
  color: royalblue;
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
  margin-top: 50px;
`;

export const ChatRoomsText = styled.h3``;

export const RoomButton = styled.button`
  outline: none;
  border: none;
  appearance: none;
  cursor: pointer;

  width: 200px;
  height: 50px;
  background-image: linear-gradient(120deg, #3498db, #8e44ad);
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
  color: #f1f1f1;
  font-size: 16px;
  background-size: 200%;
  transition: 0.3s ease-out;
  margin-top: 10px;

  &:hover {
    background-position: right;
  }
`;
