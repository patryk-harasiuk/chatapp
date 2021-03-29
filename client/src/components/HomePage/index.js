import React from 'react';
import {
    Wrapper,
    SidebarRooms,
    HomeCenter,
    SidebarFriends,
    SidebarRoomsNav,
    ProfileCard,
    Form,
    InputBox,
    Input,
    SubmitMessageButton
} from './HomePageStyles';

const HomePage = () => {
    return (
        <Wrapper>
            <SidebarRooms>
                <ProfileCard>

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

            <SidebarFriends>

            </SidebarFriends>
        </Wrapper>
    );
}

export default HomePage;
