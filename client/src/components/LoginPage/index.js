import React, { useState } from 'react';
import { useUserProvider } from '../../context/UserProvider';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
    RegisterWrapper,
    RegisterForm,
    RegisterHeading,
    InputBox,
    Label,
    Input,
    ButtonSingUp,
    Login,
    LoginLink,
    ErrorInfo
} from '../RegisterPage/RegisterPageStyles';

const LoginPage = () => {

    const { updateUserData } = useUserProvider();

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState({});

    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('/login', {
            email: loginForm.email,
            password: loginForm.password
        })
        .then(response => {
            setError({});
            localStorage.setItem('tokenauth', response.data.accessToken);
            updateUserData();
            history.push('/');
        })
        .catch(error => {
            setError(error.response.data);
        });
    };

    return (
        <RegisterWrapper>

            <RegisterForm onSubmit={handleSubmit}>
                <RegisterHeading>Login</RegisterHeading>

                <InputBox>
                    <Label htmlFor='e-mail'>Email</Label>
                    <Input 
                      autoComplete='off'
                      required='required'
                      type='text'
                      name='e-mail'
                      onChange={e => setLoginForm({...loginForm, email: e.target.value})}
                    />
                    {error.path === 'email' ? <ErrorInfo>{error.errorMessage}</ErrorInfo> : null}
                </InputBox>

                <InputBox>
                    <Label htmlFor='password'>Password</Label>
                    <Input 
                      autoComplete='off'
                      required='required'
                      type='password'
                      name='password'
                      onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                    />
                    {error.path === 'password' ? <ErrorInfo>{error.errorMessage}</ErrorInfo> : null}
                </InputBox>
                <ButtonSingUp type='submit'>Login</ButtonSingUp>
                <Login>Dont have an account? <LoginLink to='/register'>Sign up</LoginLink></Login>
            </RegisterForm>

       </RegisterWrapper>
    );
}

export default LoginPage;
