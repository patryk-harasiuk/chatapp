import styled from 'styled-components';

export const LoginWrapper = styled.div`
min-height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`;

export const LoginBox = styled.div`
    width: 500px;
    height: 700px;
    font-family: 'Lato', sans-serif;
    /* border: 2px solid royalblue; */
/* background-color: royalblue; */
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    box-shadow: 0px 0px 12px -4px rgba(0,0,0,1);
-webkit-box-shadow: 0px 0px 12px -4px rgba(0,0,0,1);
-moz-box-shadow: 0px 0px 12px -4px rgba(0,0,0,1);
`;

export const Heading = styled.h2`
    color: #2c3e50;
`;

export const Paragraph = styled.div`
    color: #828899;
    /* font-weight: 600; */
    width: 250px;
    text-align: center;
`;

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: space-evenly; */
`;

export const Input = styled.input`
    appearance: none;
    outline: none;
    border: 1px solid #BBC4D8;
    
    /* margin: 5px 0px; */
    margin: 15px 0px;
    padding: 10px;
    font-size: 16px;
    color: #2c3e50;
    font-weight: 600;
    width: 300px;
    height: 50px;

    &::-webkit-input-placeholder {
        color: #828899;
        font-size: 12px;
        font-style: italic;
    }
`;

export const HeadingInput = styled.h5`
    width: 300px;
    color: #828899;
    font-size: 12px;
    text-transform: uppercase;
`;

export const ButtonSingUp = styled.button`
    appearance: none;
    outline: none;
    border: none;
    background: #673AB7;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #512DA8, #673AB7);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #512DA8, #673AB7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


    width: 300px;
    height: 50px;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    /* font-weight: 600; */

    box-shadow: 2px 3px 23px -3px rgba(103,58,183,0.6);
-webkit-box-shadow: 2px 3px 23px -3px rgba(103,58,183,0.6);
-moz-box-shadow: 2px 3px 23px -3px rgba(103,58,183,0.6);
`;

export const ButtonLogIn = styled.button`
    appearance: none;
    outline: none;
    border: none;
    background: #673AB7;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #512DA8, #673AB7);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #512DA8, #673AB7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    width: 300px;
    height: 50px;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;

    box-shadow: 2px 3px 23px -3px rgba(103,58,183,0.6);
-webkit-box-shadow: 2px 3px 23px -3px rgba(103,58,183,0.6);
-moz-box-shadow: 2px 3px 23px -3px rgba(103,58,183,0.6);
`;