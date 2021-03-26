import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { RegisterWrapper, Login, RegisterForm, Input, InputBox, Label, RegisterHeading, ButtonSingUp, LoginLink } from './RegisterPageStyles';


const RegisterPage = () => {

    const [registerState, setRegisterState] = useState({
        username: '',
        password: '',
        email: ''
    });
    
    const submitHandler = e => {
        e.preventDefault();

        axios.post('/register', {
            username: registerState.username,
            password: registerState.password,
            email: registerState.email
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error.response);
            // console.log(error.status);
            // console.log(error.headers);
          });
    }

    return (
        <RegisterWrapper>
                <RegisterForm onSubmit={submitHandler}>
                    <RegisterHeading>Create your account!</RegisterHeading>
                    <InputBox>
                        <Label htmlFor='username'>Username</Label>
                        <Input 
                            required='required'
                            type='text'
                            name='username' 
                            // placeholder='Username'
                            value={registerState.username}
                            onChange={e => setRegisterState({...registerState, username: e.target.value})}
                            />
                    </InputBox>

                    <InputBox>
                    <Label htmlFor='password'>Password</Label>
                        <Input 
                            required='required'
                            type='password'
                            name='password' 
                            // placeholder='Password'
                            value={registerState.password}
                            onChange={e => setRegisterState({...registerState, password: e.target.value})} 
                            />
                        </InputBox>                    
                  
                    <InputBox>
                    <Label htmlFor='e-mail'>Email</Label>
                        <Input 
                            required='required'
                            type='email'
                            name='e-mail' 
                            // placeholder='E-mail'
                            value={registerState.email}
                            onChange={e => setRegisterState({...registerState, email: e.target.value})} 
                            />
                        </InputBox>
                <ButtonSingUp type='submit'>Sign up</ButtonSingUp>
                <Login>Already have an account? <LoginLink to='/login'>Log in</LoginLink></Login>
                </RegisterForm>
        </RegisterWrapper>
    );
}

export default RegisterPage;
