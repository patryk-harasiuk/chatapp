import React, { useEffect } from 'react';
import { useUserProvider } from '../../context/UserProvider';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
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
} from './HomePageStyles';

const HomePage = () => {

    const { userData, setUserData, updateUserData }  = useUserProvider();
    const token  = localStorage.getItem('tokenauth');
    const history = useHistory();

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

            <HomeCenter>
                <Form>
                    <InputBox>
                        <Input></Input>
                        <SubmitMessageButton>Submit</SubmitMessageButton>
                    </InputBox>
                </Form>
            </HomeCenter>

        </Wrapper>
    );
}

export default HomePage;
