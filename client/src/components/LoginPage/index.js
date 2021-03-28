import React from 'react';
import {
    RegisterWrapper,
    RegisterForm,
    RegisterHeading,
    InputBox,
    Label,
    Input,
    ButtonSingUp,
    Login,
    LoginLink
} from '../RegisterPage/RegisterPageStyles';

const index = () => {
    return (
        <RegisterWrapper>

            <RegisterForm>
                <RegisterHeading>Login</RegisterHeading>

                <InputBox>
                    <Label htmlFor='e-mail'>Email</Label>
                    <Input 
                      autoComplete='off'
                      required='required'
                      type='text'
                      name='e-mail'
                    />
                </InputBox>

                <InputBox>
                    <Label htmlFor='password'>Password</Label>
                    <Input 
                      autoComplete='off'
                      required='required'
                      type='text'
                      name='password'
                    />
                </InputBox>
                <ButtonSingUp type='submit'>Login</ButtonSingUp>
                <Login>Dont have an account? <LoginLink to='/register'>Sign up</LoginLink></Login>
            </RegisterForm>

       </RegisterWrapper>
    );
}

export default index;
