import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProfileCard } from '../HomePage/HomePageStyles';

export const Wrapper = styled.div`
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
    background: linear-gradient(40deg, #ff6ec4, #7873f5);
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

    margin-top: 20px;
    width: 80px;
    height: 35px;
    border-radius: 25px;
    background: linear-gradient(40deg, #ff6ec4, #7873f5);
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
    color: #fff;
    font-weight: 600;
`;

export const LogoutButton = styled(Link)`
    text-decoration: none;
    color: royalblue;
    font-weight: 600;
    margin-top: 35px;
`;

export const ProfileEmail = styled.h5`
    padding-top: 20px;
`;

export const FileNameInformation = styled.h5`
    padding-top: 5px;
    color: grey;
`

