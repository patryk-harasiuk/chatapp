import React from 'react';
import { useUserProvider } from '../../context/UserProvider';
import {
    Wrapper,
    SidebarRooms,
    HomeCenter,
    // SidebarFriends,
    SidebarRoomsNav,
    ProfileCard,
    Form,
    InputBox,
    Input,
    SubmitMessageButton,
    ProfileCardInfoWrapper,
    ProfileCardImage,
    ProfileName
} from './HomePageStyles';


const HomePage = () => {

    const { userData }  = useUserProvider();
    // console.log(userData.username);

    return (
        <Wrapper>
            <SidebarRooms>
                <ProfileCard>
                    <ProfileCardInfoWrapper>
                        <ProfileCardImage src={userData.userAvatar} />
                        <ProfileName>{userData.username}</ProfileName>
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
