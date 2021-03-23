import React, { useState } from 'react';
import { LoginWrapper, LoginBox, Heading, Paragraph, LoginForm, Input, HeadingInput, ButtonSingUp, ButtonLogIn } from './RegisterPageStyles';


const RegisterPage = () => {

    const [registerState, setRegisterState] = useState({
        username: '',
        password: '',
        repeatPassword: '',
        email: ''
    });
    
    const submitHandler = e => {
        e.preventDefault();

        
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
                    <HeadingInput>Repeat Password</HeadingInput>
                    <Input 
                        type='text'
                        name='password' 
                        placeholder='Repeat password'
                        value={registerState.repeatPassword}
                        onChange={e => setRegisterState({...registerState, repeatPassword: e.target.value})} 
                    />
                    <HeadingInput>E-mail</HeadingInput>
                    <Input 
                        type='email'
                        name='e-mail' 
                        placeholder='E-mail'
                        value={registerState.email}
                        onChange={e => setRegisterState({...registerState, email: e.target.value})} 
                    />
                </LoginForm>

                <ButtonSingUp>Sign up</ButtonSingUp>
                <ButtonLogIn>Log in</ButtonLogIn>

            </LoginBox>

        </LoginWrapper>
    );
}

export default RegisterPage;
