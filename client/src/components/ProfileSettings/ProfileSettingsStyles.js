import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProfileCard } from "../Sidebar/SidebarStyles";

export const Wrapper = styled.div`
  background: #2f3136;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileCardSettings = styled(ProfileCard)`
  height: 500px;
  width: 300px;
`;

export const ChangeAvatarForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`;

export const ChangeAvatar = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  width: 200px;
  height: 50px;
  border-radius: 25px;
  position: absolute;
  cursor: pointer;
`;

export const ChangeAvatarLabel = styled.label`
  display: block;
  position: relative;
  width: 150px;
  height: 50px;
  border-radius: 25px;
  background: #7289da;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
`;

export const ChangeAvatarSubmit = styled.button`
  border: none;
  appearance: none;
  outline: none;
  cursor: pointer;
  background: #7289da;

  margin-top: 20px;
  width: 80px;
  height: 35px;
  border-radius: 25px;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
  color: #fff;
  font-weight: 600;
`;

export const LogoutButton = styled(Link)`
  text-decoration: none;
  color: #3ba55c;
  font-weight: 600;
  margin-top: 35px;
`;

export const ProfileEmail = styled.p`
  font-size: 14px;
  padding-top: 20px;
  color: #fff;
`;

export const FileNameInformation = styled.h5`
  padding-top: 5px;
  color: grey;
`;
