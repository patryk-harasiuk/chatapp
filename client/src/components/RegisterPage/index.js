import React, { useState } from 'react';
import axios from 'axios';
import { LoginWrapper, LoginBox, Heading, Paragraph, LoginForm, Input, HeadingInput, ButtonSingUp, ButtonLogIn } from './RegisterPageStyles';


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
            console.log(error);
          });
    }

    return (
        <LoginWrapper>

            <LoginBox>
                <Heading>
                    Create your account!
                </Heading>
                <Paragraph>
                    Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse
                </Paragraph>

                <LoginForm onSubmit={submitHandler}>
                    <HeadingInput>Username</HeadingInput>
                    <Input 
                        type='text'
                        name='username' 
                        placeholder='Username'
                        value={registerState.username}
                        onChange={e => setRegisterState({...registerState, username: e.target.value})}
                    />

                    <HeadingInput>Password</HeadingInput>
                    <Input 
                        type='text'
                        name='password' 
                        placeholder='Password'
                        value={registerState.password}
                        onChange={e => setRegisterState({...registerState, password: e.target.value})} 
                    />
                    {/* <HeadingInput>Repeat Password</HeadingInput>
                    <Input 
                        type='text'
                        name='password' 
                        placeholder='Repeat password'
                        value={registerState.repeatPassword}
                        onChange={e => setRegisterState({...registerState, repeatPassword: e.target.value})} 
                    /> */}
                    <HeadingInput>E-mail</HeadingInput>
                    <Input 
                        type='email'
                        name='e-mail' 
                        placeholder='E-mail'
                        value={registerState.email}
                        onChange={e => setRegisterState({...registerState, email: e.target.value})} 
                    />
                <ButtonSingUp type='submit'>Sign up</ButtonSingUp>
                <ButtonLogIn>Log in</ButtonLogIn>
                </LoginForm>


            </LoginBox>

        </LoginWrapper>
    );
}

export default RegisterPage;
