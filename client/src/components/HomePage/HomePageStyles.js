import styled from 'styled-components';
import { IoMdSettings } from 'react-icons/io';
import { GrEmoji } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { HiOutlinePhotograph } from 'react-icons/hi';

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
    box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);
    transition: .3s ease-out;

    &:checked {
        background: #e74c3c;
    }

    &::before {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        transform: scale(1.1);
        box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
        transition: .3s ease-in-out;
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
`;


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
    justify-content: ${props => props.otherUser ? 'flex-start' : 'flex-end'};
    align-items: center;
    margin: 5px 10px;
`;

export const Message = styled.li`
    color: ${props => props.otherUser ? 'black' : '#fff'};
    padding: 8px;
    background: ${props => props.otherUser ? '#FFFAFA' : 'royalblue'};
    border-radius: 8px;
    margin: 5px 10px;
    font-family: 'Roboto', sans-serif;
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
