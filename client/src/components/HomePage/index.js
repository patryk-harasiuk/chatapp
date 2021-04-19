import React, { useEffect, useState, useRef } from 'react';
import { useUserProvider } from '../../context/UserProvider';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import Picker from 'emoji-picker-react';
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
    ActivityCheckbox,
    Label,
    SettingsIcon,
    SettingsLink,
    MessageBox,
    Message,
    MessageUsername,
    MessageAvatatr,
    ColumnPlacement,
    MessageTimeStamp,
    EmojiIcon,
    FileUploadIcon,
    MessagesWrapper
} from './HomePageStyles';

const HomePage = () => {

    const { userData, setUserData, updateUserData }  = useUserProvider();
    const token = localStorage.getItem('tokenauth');
    const history = useHistory();
    const [yourID, setYourID] = useState();
    const [chatMessages, setChatMessages] = useState([]);
    const [chatMessage, setChatMessage] = useState('');
    const [emojiClick, setEmocjiClick] = useState(false);
    const [activeClick, setActiveClick] = useState(() => {
        return localStorage.getItem('activityStatus') 
            ? JSON.parse(localStorage.getItem('activityStatus'))
            : true;
    });
   
    const socketRef = useRef();
    const lastMessageRef = useRef();

    useEffect(() => {
        if (lastMessageRef.current) return lastMessageRef.current.scrollIntoView({ smooth: true });
    }, [chatMessages]);

    const receivedMessage = message => {
        setChatMessages(prevState => [...prevState, message]);
    }

    const sendMessage = e => {
        e.preventDefault();

        if (!chatMessage) return;

        const messageObject = {
            body: chatMessage,
            id: yourID,
            username: userData.username,
            userAvatar: userData.userAvatar,
            messageTimeStamp: new Date().toLocaleTimeString()
        }
        setChatMessage('');
        socketRef.current.emit('send message', messageObject);
    }

    const onEmojiClick = (e, emojiObject) => {
        setChatMessage(prevState => prevState + emojiObject.emoji);
    }

    const activityStatusHandler = () => {
        setActiveClick(!activeClick);
        localStorage.setItem('activityStatus', JSON.stringify(!activeClick));
    }

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
                        <ActivityCheckbox 
                            type='checkbox' 
                            name='checkbox' 
                            onChange={activityStatusHandler} 
                            checked={activeClick ? false : true} 
                        />
                        <Label 
                            htmlFor='checkbox'
                            style={activeClick ? {color: '#27ae60'} : {color: '#e74c3c'}}>
                            {activeClick ? 'Active' : 'Away'}
                        </Label>
                        <SettingsLink to='/settings' >
                            <SettingsIcon />
                        </SettingsLink>

                    </ProfileCardInfoWrapper>
                </ProfileCard>

                <SidebarRoomsNav>
                    Messages
                </SidebarRoomsNav>
            </SidebarRooms>

            <HomeCenter>     
                <MessagesWrapper>
                    {chatMessages.map((message, index) => {
                        const lastMessage = chatMessages.length - 1 === index;
                        // console.log(chatMessages.length - 1)
                        if (message.id === yourID) {
                            return (
                                <MessageBox 
                                    key={index}
                                    ref={lastMessage ? lastMessageRef : null}>
                                   <ColumnPlacement>

                                        <MessageUsername>
                                            {message.username}
                                        </MessageUsername>
                                        
                                        <Message>
                                            {message.body}
                                            <MessageTimeStamp>{message.messageTimeStamp}</MessageTimeStamp>
                                        </Message>

                                   </ColumnPlacement>
                                    <MessageAvatatr src={message.userAvatar} />
                                </MessageBox>
                            );
                        } else {
                            return (
                                <MessageBox otherUser key={index}>
                                    <MessageAvatatr src={message.userAvatar} />
                                    <ColumnPlacement>
                                        <MessageUsername>
                                            {message.username}
                                        </MessageUsername>

                                        <Message otherUser>
                                            {message.body}
                                            <MessageTimeStamp>{message.messageTimeStamp}</MessageTimeStamp>
                                        </Message>
                                    </ColumnPlacement>
                                </MessageBox>
                            );
                        }
                    })}
                </MessagesWrapper>
                <Form onSubmit={sendMessage}>
                    <InputBox>
                        <Input 
                            value={chatMessage} 
                            onChange={e => setChatMessage(e.target.value)} 
                            placeholder='Aa...'
                            spellCheck='false'
                        />
                        <Picker
                            pickerStyle={emojiClick ? {
                                    position: 'fixed',
                                    bottom: '90px'
                            } : { display: 'none' }} 
                            onEmojiClick={onEmojiClick}
                            disableAutoFocus={true}
                            />
                            
                        <EmojiIcon onClick={() => setEmocjiClick(!emojiClick)} />
                        <FileUploadIcon />
                        <SubmitMessageButton type='submit'>Submit</SubmitMessageButton>
                    </InputBox>
                </Form>
            </HomeCenter>

        </Wrapper>
    );
}

export default HomePage;
