import styled from 'styled-components';

import {
    ProfileCard
} from '../HomePage/HomePageStyles';

export const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ProfileCardSettings = styled(ProfileCard)`
    height: 500px;
    width: 300px;
`;

export const ChangeAvatarForm = styled.form`

`;

export const ChangeAvatar = styled.input`
    
`;

export const ChangeAvatarSubmit = styled.button`
    
`;

// export const ChangeAvatarLabel = styled.label`
//     width: 200px;
//     height: 50px;
//     border-radius: 25px;
//     background: linear-gradient(40deg, #ff6ec4, #7873f5);
//     box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: #fff;
//     font-weight: bold;
//     cursor: pointer;
//     transition: transform .2s ease-out;

//     &:hover {
//         background: linear-gradient(80deg, #ff6ec4, #7873f5);
//   }
// `;
