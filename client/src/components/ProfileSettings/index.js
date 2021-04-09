import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useUserProvider } from '../../context/UserProvider';
import { Wrapper, ProfileCardSettings, ChangeAvatar, ChangeAvatarForm, ChangeAvatarSubmit, ProfileEmail, ChangeAvatarLabel, FileNameInformation, LogoutButton } from './ProfileSettingsStyles';
import { ProfileCardInfoWrapper, ProfileCardImage, ProfileName } from '../HomePage/HomePageStyles';



const ProfileSettings = () => {

    const { userData, setUserData, updateUserData } = useUserProvider();
    const imageInput = useRef();
    const token = localStorage.getItem('tokenauth');
    const [error, setError] = useState({});
    const [fileName, setFileName] = useState('');
    const [click, setClick] = useState(false);

    const handleFileInformation = e => {
        setFileName(e.target.files[0].name);
        setClick(false);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const file = imageInput.current.files[0];
        setError({});
        
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            
            await axios.post('/settings', formData,
            {withCredentials: true, headers: {'content-type': 'multipart/form-data', 'authorization': `Bearer ${token}`}})
            .then(response => {
                setError({});
                setUserData({...userData, userAvatar: response});
                updateUserData();
                setFileName('');

                console.log(userData);
            })
            .catch(error => {
                setError(error.response.data);
                console.log(error.response.data);
            });
        } else {
            setError({errorMessage: 'You must upload an image'});
        }
    }

    return (
        <Wrapper>
            <ProfileCardSettings>
                <ProfileCardInfoWrapper>
                    <ProfileCardImage src={userData.userAvatar} />
                    <ProfileName>{userData.username}</ProfileName>
                    <ProfileEmail>{userData.email}</ProfileEmail>
                    <ChangeAvatarForm onSubmit={handleSubmit} encType='multipart/form-data' >
                        <ChangeAvatarLabel htmlFor='file'> Change avatar
                            <ChangeAvatar 
                            type='file' 
                            accept='.png, .jpg, .jpeg' 
                            name='file'
                            ref={imageInput}
                            onChange={handleFileInformation}
                            />
                        </ChangeAvatarLabel>
                            {fileName ? <FileNameInformation>{fileName}</FileNameInformation> : null}
                            {click ? <FileNameInformation>Upload an image first</FileNameInformation>: null}
                        <ChangeAvatarSubmit type='submit' onClick={() => (!fileName) ? setClick(true) : null}>Change</ChangeAvatarSubmit>

                    </ChangeAvatarForm>
                   
                    <LogoutButton to='/login' >Logout</LogoutButton>
                </ProfileCardInfoWrapper>
            </ProfileCardSettings>
        </Wrapper>
    );
}

export default ProfileSettings;
