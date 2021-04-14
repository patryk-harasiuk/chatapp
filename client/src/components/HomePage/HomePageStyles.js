import styled from 'styled-components';
import { IoMdSettings } from 'react-icons/io';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
`;

export const SidebarRooms = styled.div`
    width: 450px;
    height: 100vh;
    background: whitesmoke;
    border-right: 1px solid #ACACAC;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const ProfileCard = styled.div`
    height: 300px;
    width: 250px;
    background: #E8E8F2;
    margin-top: 50px;
    border-radius: 15px;
    -webkit-box-shadow: 1px 1px 8px 1px rgba(0,0,0,0.5); 
    box-shadow: 1px 1px 8px 1px rgba(0,0,0,0.5);
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
    padding-top: 20px;
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
    height: 60px;
    font-size: 24px;
    font-weight: 600;
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 40px;
    margin-top: 50px;
`;

export const HomeCenter = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    background: violet;
    position: relative;
    background: #E8E8F2;
    
    /* &.join {
        opacity: 0.4;

    } */
`;

// export const JoinButton = styled.button`
//      appearance: none;
//     outline: none;
//     border: none;
    
//     color: #fff;
//     height: 50px;
//     width: 150px;
//     background: royalblue;
//     padding: 10px 15px;
//     border-radius: 5px;
// `;


export const Form = styled.form`
    width: 100%;
    position: absolute;
    bottom: 0;
`;

export const InputBox = styled.div`
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 75px;
    margin: 10px 20px;
    border-radius: 4px;
    -webkit-box-shadow: 1px 1px 8px 1px rgba(0,0,0,0.3); 
    box-shadow: 1px 1px 8px 1px rgba(0,0,0,0.3);
`;

export const Input = styled.input`
    appearance: none;
    outline: none;
    border: 1px solid #ACACAC;
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
    
    color: #fff;
    height: 40px;
    background: royalblue;
    padding: 10px 15px;
    border-radius: 5px;
    margin-left: 5px;
`;

export const SidebarFriends = styled.div`
    width: 25vw;
    height: 100vh;
    background: purple;
`;

export const MyMessageBox = styled.div`
    /* width: fit-content; */
    display: flex;
    justify-content: flex-end;
`;

export const OtherUserMessageBox = styled.div`
    /* width: fit-content; */
    display: flex;
  
`;

export const MyMessage = styled.li`
    color: #fff;
    padding: 8px;
    background: royalblue;
    border-radius: 8px;
    margin: 1px 10px;
    font-family: 'Roboto', sans-serif;
`;

export const OtherUserMessage = styled(MyMessage)`
    color: black;
    background: #FFFAFA;
    /* padding: 5px; */
    /* border-radius: 6px; */
`;