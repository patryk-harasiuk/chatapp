import styled from "styled-components";
import { Link } from "react-router-dom";

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
  background: #2f3136;
  height: 600px;
  border-radius: 10px;
`;

export const RegisterHeading = styled.h2`
  text-align: center;
  font-size: 28px;
  color: #fff;
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
  border-bottom: 1px solid #fff;
  font-size: 14px;
  color: #fff;
  padding: 8px 5px;
  transition: 0.3s ease-out;

  :focus,
  :valid {
    border-bottom: 1px solid #3ba55c;
  }
`;

export const Label = styled.label`
  position: absolute;
  transform: translateY(10px);
  color: #fff;
  font-size: 14px;
  pointer-events: none;
  transition: 0.2s ease-out;

  ${Input}:focus ~ &,
    ${Input}:valid ~ & {
    transform: translateY(-15px);
    font-size: 11px;
    color: #3ba55c;
    opacity: 0.9;
  }
`;

export const ButtonSingUp = styled.button`
  outline: none;
  border: none;
  appearance: none;
  cursor: pointer;

  width: 300px;
  height: 50px;
  background-image: linear-gradient(120deg, #3498db, #8e44ad);
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
  color: #f1f1f1;
  font-size: 16px;
  background-size: 200%;
  transition: 0.3s ease-out;

  &:hover {
    background-position: right;
  }
`;

export const Login = styled.p`
  color: #fff;
  font-size: 14px;
`;

export const LoginLink = styled(Link)`
  color: #3ba55c;
  outline: none;
  appearance: none;
  text-decoration: none;
`;

export const ErrorInfo = styled.div`
  text-align: center;
  padding-top: 5px;
  font-size: 12px;
  color: #ed4245;
`;
