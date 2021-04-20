import React from 'react';
import { TextBox, Wrapper, Text, Button, StatusCode } from './NotFoundPageStyles';

const NotFoundPage = () => {
    return (
        <Wrapper>
            <TextBox>
                <StatusCode>404</StatusCode>

                <Text>
                Oops! This page does not exist.
                </Text>

                <Button to='/'>Go back</Button>        

            </TextBox>
        </Wrapper>
    );
}

export default NotFoundPage;
