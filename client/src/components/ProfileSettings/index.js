import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useUserProvider } from '../../context/UserProvider';
import { Wrapper, ProfileCardSettings, ChangeAvatar, ChangeAvatarForm, ChangeAvatarSubmit } from './ProfileSettingsStyles';
import { ProfileCardInfoWrapper, ProfileCardImage, ProfileName } from '../HomePage/HomePageStyles';

const ProfileSettings = () => {

    const { userData, setUserData } = useUserProvider();

    // const imageInput = useRef();

    const token = localStorage.getItem('authtoken');

    const [file, setFile] = useState();
    const [error, setError] = useState({});


    const handleSubmit = async e => {
        e.preventDefault();

        // const file = imageInput.current.files[0];
        console.log(file);
        setError({});
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            
            await axios.post('/settings', formData,
            {withCredentials: true, headers: {'content-type': 'multipart/form-data', 'authorization': `Bearer ${token}`}})
            .then(response => {
                setError({});
                // setUserData({...userData, userAvatar: response});
                console.log(response);
            })
            .catch(error => {
                setError(error.response.data);
                console.log(error.response.data);
            });
        } else {
            setError({errorMessage: 'You must upload an image'});
            console.log('upload an image zjeb')
        }

    }

    return (
        <Wrapper>
            <ProfileCardSettings>
                <ProfileCardInfoWrapper>
                    <ProfileCardImage src={userData.userAvatar} />
                    <ProfileName>{userData.username}</ProfileName>
                    <ChangeAvatarForm onSubmit={handleSubmit} encType='multipart/form-data' >
                        <ChangeAvatar 
                        type='file' 
                        accept='.png, .jpg, .jpeg' 
                        name='file'
                        onChange={e => setFile(e.target.files[0])} 
                        // ref={imageInput}
                         />
                        <ChangeAvatarSubmit type='submit'>Change</ChangeAvatarSubmit>
                    </ChangeAvatarForm>
                   
                </ProfileCardInfoWrapper>
            </ProfileCardSettings>
        </Wrapper>
    );
}

export default ProfileSettings;
