import { Link } from 'react-router-dom';
import styled from 'styled-components';


export const RegisterWrapper = styled.div`
    min-height: 100vh;
    background-image: linear-gradient(120deg, #3498db, #8e44ad);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const RegisterForm = styled.form`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 450px;
    background: #f1f1f1;
    height: 600px;
    border-radius: 10px;

`;

export const RegisterHeading = styled.h2`
    text-align: center;
    font-size: 28px;

`;

export const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 300px;
`;


export const Input = styled.input`
    outline: none;
    background: none;
    border: none;
    appearance: none;
    background: none;

    width: 300px;
    display: block;
    border-bottom: 1px solid #212121;
    font-size: 14px;
    font-weight: 600;
    color: #212121;
    padding: 8px 5px;
    transition: .3s ease-out;

    :focus,
    :valid {
        border-bottom: 1px solid royalblue;
    }
`;
export const Label = styled.label`
    position: absolute;
    transform: translateY(-15px);
    font-size: 14px;
    pointer-events: none;
    transition: .3s ease-out;
`;

export const ButtonSingUp = styled.button`
    outline: none;
    border: none;
    appearance: none;
    cursor: pointer;

    width: 300px;
    height: 50px;
    background-image: linear-gradient(120deg, #3498db, #8e44ad);
    color: #f1f1f1;
    font-size: 16px;
    background-size: 200%;
    transition: .3s ease-out;

    &:hover {
        background-position: right;
    }
`;

export const Login = styled.p`
    font-size: 14px;
    font-weight: 600;
`;

export const LoginLink = styled(Link)`
    color: royalblue;
    outline: none;
    appearance: none;
    text-decoration: none;
 `;

export const ErrorInfo = styled.div`
    text-align: center;
    padding-top: 5px;
    font-size: 12px;
    color: rgb(212, 8, 8);
`;