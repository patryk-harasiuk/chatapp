import React, { useState } from 'react';
import { useUserProvider } from '../../context/UserProvider';
import { useHistory } from 'react-router-dom';
import LoadingAnimation from '../LoadingAnimation';
import axios from 'axios';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
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
        password: '',
        loading: false
    });

    const [error, setError] = useState({});

    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        setLoginForm({...loginForm, loading: true});
        setError({});

        axios.post('/login', {
            email: loginForm.email,
            password: loginForm.password
        })
        .then(response => {
            setLoginForm({...loginForm, loading: false});
            setError({});
            localStorage.setItem('tokenauth', response.data.accessToken);
            updateUserData();
            history.push('/');

            store.addNotification({
                message: 'Succesfully logged in',
                type: 'success',
                container: 'top-right',
                insert: 'top',
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 4000,
                  onScreen: true
                }
            });
        })
        .catch(error => {
            setLoginForm({...loginForm, loading: false});
            setError(error.response.data);
        });
    };

    if (loginForm.loading) {
        return (
            <LoadingAnimation></LoadingAnimation>
        );
    }

    return (
        <RegisterWrapper>

            <RegisterForm onSubmit={handleSubmit}>
                <RegisterHeading>Login</RegisterHeading>

                <InputBox>
                    <Input 
                      autoComplete='off'
                      required='required'
                      type='text'
                      name='e-mail'
                      onChange={e => setLoginForm({...loginForm, email: e.target.value})}
                    />
                    <Label htmlFor='e-mail'>Email</Label>
                    {error.path === 'email' ? <ErrorInfo>{error.errorMessage}</ErrorInfo> : null}
                </InputBox>

                <InputBox>
                    <Input 
                      autoComplete='off'
                      required='required'
                      type='password'
                      name='password'
                      onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                    />
                    <Label htmlFor='password'>Password</Label>
                    {error.path === 'password' ? <ErrorInfo>{error.errorMessage}</ErrorInfo> : null}
                </InputBox>
                <ButtonSingUp type='submit'>Login</ButtonSingUp>
                <Login>Dont have an account? <LoginLink to='/register'>Sign up</LoginLink></Login>
            </RegisterForm>

       </RegisterWrapper>
    );
}

export default LoginPage;
