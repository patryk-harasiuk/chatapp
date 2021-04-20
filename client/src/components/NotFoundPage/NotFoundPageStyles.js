import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TextBox = styled.div`
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
`;

export const StatusCode = styled.p`
    font-size: 100px;
    color: #8C8C9C;
`;

export const Text = styled.h1`
    color: #8C8C9C;
    padding-bottom: 20px;
`;

export const Button = styled(Link)`
    text-decoration: none;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 50px;
    background-image: linear-gradient(120deg, #3498db, #8e44ad);
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
    color: #f1f1f1;
    font-size: 16px;
    background-size: 200%;
    transition: .3s ease-out;

    &:hover {
        background-position: right;
    }
`;