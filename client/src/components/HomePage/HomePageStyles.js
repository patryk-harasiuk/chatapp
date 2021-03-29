import styled from 'styled-components';

export const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
`;

export const SidebarRooms = styled.div`
    width: 25vw;
    height: 100vh;
    background: royalblue;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;
`;

export const ProfileCard = styled.div`
    height: 20vh;
    width: 10vw;
    background: #fff;
    margin-top: 50px;
    border-radius: 15px;
`;

export const SidebarRoomsNav = styled.nav`
    height: 60px;
    background: papayawhip;
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 20px;
    margin-top: 50px;
`;

export const HomeCenter = styled.div`
    width: 50vw;
    height: 100vh;
    display: flex;
`;

export const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    margin-bottom: 25px;
`;

export const InputBox = styled.div`
    width: 45vw;
    border-radius: 10px;
    background: royalblue;
`;

export const Input = styled.input`
    appearance: none;
    outline: none;
    border: none;
    background: none;
    cursor: pointer;

    width: 35vw;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    margin: 5px;
`;

export const SubmitMessageButton = styled.button`
    appearance: none;
    outline: none;
    border: none;
    
    width: 5vw;
    background: crimson;
    padding: 5px;

`;

export const SidebarFriends = styled.div`
    width: 25vw;
    height: 100vh;
    background: purple;
`;