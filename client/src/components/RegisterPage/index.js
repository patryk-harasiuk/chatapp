import React, { useState } from 'react';
import axios from 'axios';
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
    // const [loading, setLoading] = useState(false);
    
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
            console.log(response);
            setRegisterState({...registerState, loading: false});
            setError({});
          })
          .catch(error => {
            console.log(error.response.data);
            setRegisterState({...registerState, loading: false});
            setError(error.response.data);
          });
    }
// console.log(error.path)
    return (
        <RegisterWrapper>
                <RegisterForm onSubmit={submitHandler}>
                    <RegisterHeading>Create your account!</RegisterHeading>
                    <InputBox>
                        <Label htmlFor='username'>Username</Label>
                        <Input 
                            autoComplete='off'
                            required='required'
                            type='text'
                            name='username' 
                            // placeholder='Username'
                            value={registerState.username}
                            onChange={e => setRegisterState({...registerState, username: e.target.value})}
                            />
                            {error.path === 'username' ? <ErrorInfo>{error.errorMessage}</ErrorInfo> : null}
                    </InputBox>

                    <InputBox>
                    <Label htmlFor='password'>Password</Label>
                        <Input 
                            autoComplete='off'
                            required='required'
                            type='password'
                            name='password' 
                            // placeholder='Password'
                            value={registerState.password}
                            onChange={e => setRegisterState({...registerState, password: e.target.value})} 
                            />
                            {error.path === 'password' ? <ErrorInfo>{error.errorMessage}</ErrorInfo> : null}
                        </InputBox>                    
                  
                    <InputBox>
                    <Label htmlFor='e-mail'>Email</Label>
                        <Input 
                            autoComplete='off'
                            required='required'
                            type='email'
                            name='e-mail' 
                            // placeholder='E-mail'
                            value={registerState.email}
                            onChange={e => setRegisterState({...registerState, email: e.target.value})} 
                            />
                            {error.path === 'email' ? <ErrorInfo>{error.errorMessage}</ErrorInfo> : null}
                        </InputBox>
                <ButtonSingUp type='submit'>Sign up</ButtonSingUp>
                <Login>Already have an account? <LoginLink to='/login'>Log in</LoginLink></Login>
                </RegisterForm>
        </RegisterWrapper>
    );
}

export default RegisterPage;
