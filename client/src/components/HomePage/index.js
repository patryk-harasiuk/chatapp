import React from 'react';
import { useUserProvider } from '../../context/UserProvider';
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

    const { userData }  = useUserProvider();

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
