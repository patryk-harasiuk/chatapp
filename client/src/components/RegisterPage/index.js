import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import LoadingAnimation from '../LoadingAnimation';
import { RegisterWrapper, 
         Login, 
         RegisterForm, 
         Input, InputBox, 
         Label, 
         RegisterHeading, 
         ButtonSingUp, 
         LoginLink,
         ErrorInfo 
        } from './RegisterPageStyles';


const RegisterPage = () => {

    const [registerState, setRegisterState] = useState({
        username: '',
        password: '',
        email: '',
        loading: false
    });

    const [error, setError] = useState({});
    const history = useHistory();
    
    const submitHandler = e => {
        e.preventDefault();
        setRegisterState({...registerState, loading: true});
        setError({});

        axios.post('/register', {
            username: registerState.username,
            password: registerState.password,
            email: registerState.email
          })
          .then(response => {
            setRegisterState({...registerState, loading: false});
            setError({});
            history.push('/login');
          })
          .catch(error => {
            setRegisterState({...registerState, loading: false});
            setError(error.response.data);
          });
    }

    if (registerState.loading) {
        return (
            <LoadingAnimation></LoadingAnimation>
        );
    }

    return (
        <RegisterWrapper>
                <RegisterForm onSubmit={submitHandler}>
                    <RegisterHeading>Create your account!</RegisterHeading>
                    <InputBox>
                        <Input 
                            autoComplete='off'
                            required='required'
                            type='text'
                            name='username' 
                            value={registerState.username}
                            onChange={e => setRegisterState({...registerState, username: e.target.value})}
                            />
                        {error.path === 'username' ? <ErrorInfo>{error.errorMessage}</ErrorInfo> : null}
                        <Label htmlFor='username'>Username</Label>
                    </InputBox>

                    <InputBox>
                        <Input 
                            autoComplete='off'
                            required='required'
                            type='password'
                            name='password'
                            value={registerState.password}
                            onChange={e => setRegisterState({...registerState, password: e.target.value})} 
                            />
                        {error.path === 'password' ? <ErrorInfo>{error.errorMessage}</ErrorInfo> : null}
                        <Label htmlFor='password'>Password</Label>
                    </InputBox>                    
                  
                    <InputBox>
                        <Input 
                            autoComplete='off'
                            required='required'
                            type='text'
                            name='e-mail'
                            value={registerState.email}
                            onChange={e => setRegisterState({...registerState, email: e.target.value})} 
                            />
                        {error.path === 'email' ? <ErrorInfo>{error.errorMessage}</ErrorInfo> : null}
                        <Label htmlFor='e-mail'>Email</Label>
                        </InputBox>
                <ButtonSingUp type='submit'>Sign up</ButtonSingUp>
                <Login>Already have an account? <LoginLink to='/login'>Log in</LoginLink></Login>
                </RegisterForm>
        </RegisterWrapper>
    );
}

export default RegisterPage;
