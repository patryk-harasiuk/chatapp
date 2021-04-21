import React from 'react';
import styled from 'styled-components';
import { Label, RegisterForm, InputBox, Input, ButtonSingUp } from '../RegisterPage/RegisterPageStyles';
import { AiOutlineClose } from 'react-icons/ai';

const CreateRoomPopup = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 500px;
    height: 450px;
    z-index: 1000;
    /* display: flex; */
`;

const CreateRoomForm = styled(RegisterForm)`
    width: 100%;
    height: 100%;
    background: none;
    border-radius: 0;
`;

const CreateRoomButton = styled(ButtonSingUp)`
    width: 200px;
`;

const CloseIcon = styled(AiOutlineClose)`
    cursor: pointer;
    font-size: 24px;
    position: absolute;
    right: 0;
    margin: 5px;
    z-index: 1001;
`;


const Modal = ({ isOpen }) => {
    return (
        <CreateRoomPopup>
            <CloseIcon onClick={() => isOpen(false)} />
            <CreateRoomForm>
                <InputBox>
                    <Input 
                        type='text'
                        name='roomName'
                        required='required'
                        autoComplete='off'
                    />
                    <Label htmlFor='roomName'>Room name</Label>
                </InputBox>   
                <InputBox>
                    <Input
                        type='password'
                        name='roomPassword'
                        required='required'
                        autoComplete='off'
                    />
                    <Label htmlFor='roomPassword'>Room password</Label>
                </InputBox>
                <CreateRoomButton>Create</CreateRoomButton>
            </CreateRoomForm>
        </CreateRoomPopup>
    );
}

export default Modal;
