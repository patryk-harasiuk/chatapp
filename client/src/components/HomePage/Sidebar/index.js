import React, { useState } from 'react';
import { useUserProvider } from '../../../context/UserProvider';
import {
    SidebarRooms,
    ProfileCard,
    ProfileCardInfoWrapper,
    ProfileCardImage,
    ProfileName,
    ActivityCheckbox,
    Label,
    SettingsLink,
    SettingsIcon,
    SidebarRoomsNav
} from './SidebarStyles';

const Sidebar = () => {

    // const token = localStorage.getItem('tokenauth');
    const { userData }  = useUserProvider();
    const [activeClick, setActiveClick] = useState(() => {
        return localStorage.getItem('activityStatus') 
            ? JSON.parse(localStorage.getItem('activityStatus'))
            : true;
    });

    const activityStatusHandler = () => {
        setActiveClick(!activeClick);
        localStorage.setItem('activityStatus', JSON.stringify(!activeClick));
    }

    return (
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
    );
}

export default Sidebar;
