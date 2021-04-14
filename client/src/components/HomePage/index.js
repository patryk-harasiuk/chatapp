import React, { useEffect, useState, useRef } from 'react';
import { useUserProvider } from '../../context/UserProvider';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import {
    Wrapper,
    SidebarRooms,
    HomeCenter,
    SidebarRoomsNav,
    ProfileCard,
    Form,
    InputBox,
    Input,
    SubmitMessageButton,
    ProfileCardInfoWrapper,
    ProfileCardImage,
    ProfileName,
    SettingsIcon,
    SettingsLink,
    MyMessageBox,
    OtherUserMessageBox,
    MyMessage,
    OtherUserMessage
    // JoinButton
} from './HomePageStyles';

const HomePage = () => {

    const { userData, setUserData, updateUserData }  = useUserProvider();
    // const [joinMainRoom, setJoinMainRoom] = useState(false);
    const token  = localStorage.getItem('tokenauth');
    const history = useHistory();

    const [yourID, setYourID] = useState();
    const [chatMessages, setChatMessages] = useState([]);
    const [chatMessage, setChatMessage] = useState('');

    const socketRef = useRef();

    const receivedMessage = message => {
        setChatMessages(prevState => [...prevState, message]);
    }

    const sendMessage = e => {
        e.preventDefault();

        const messageObject = {
            body: chatMessage,
            id: yourID
        }
        setChatMessage('');
        socketRef.current.emit('send message', messageObject);
    }

    // const handleChange = e => {
    //     setChatMessage(e.target.value);
    // }

    useEffect(() => {
        socketRef.current = io.connect('/');

        socketRef.current.on('your id', id => {
            setYourID(id);
        });

        socketRef.current.on('message', message => {
            receivedMessage(message);
        });
    }, []);

    useEffect(() => {
        axios.get('auth/user', {withCredentials: true, headers: {'authorization': `Bearer ${token}`}})
        .then(response => {
            setUserData(response.data);
        })
        .catch(error => {
            updateUserData();
            history.push('/login');

            store.addNotification({
                message: 'Access denied',
                type: 'danger',
                container: 'top-right',
                insert: 'top',
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 4000,
                  onScreen: true
                }
            });
        });
    }, []);
   

    return (
        <Wrapper>
            <SidebarRooms>
                <ProfileCard>
                    <ProfileCardInfoWrapper>
                        <ProfileCardImage src={userData.userAvatar} />
                        <ProfileName>{userData.username}</ProfileName>
                        <SettingsLink to='/settings' >
                            <SettingsIcon />
                        </SettingsLink>

                    </ProfileCardInfoWrapper>
                </ProfileCard>

                <SidebarRoomsNav>
                    Messages
                </SidebarRoomsNav>
            </SidebarRooms>

            <HomeCenter >
                <Form onSubmit={sendMessage}>
                    {chatMessages.map((message, index) => {
                        if (message.id === yourID) {
                            return (
                                <MyMessageBox key={index}>
                                    <MyMessage>
                                        {message.body}
                                    </MyMessage>
                                </MyMessageBox>
                            );
                        } else {
                            return (
                                <OtherUserMessageBox key={index}>
                                    <OtherUserMessage>
                                        {message.body}
                                    </OtherUserMessage>
                                </OtherUserMessageBox>
                            )
                        }
                    })}
                    <InputBox>
                        <Input value={chatMessage} onChange={e => setChatMessage(e.target.value)} />
                        <SubmitMessageButton type='submit'>Submit</SubmitMessageButton>
                    </InputBox>
                </Form>
            </HomeCenter>

        </Wrapper>
    );
}

export default HomePage;
