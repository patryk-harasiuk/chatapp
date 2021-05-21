import React from "react";
import * as S from "./NotFoundPageStyles";

const NotFoundPage = () => {
  return (
    <S.Wrapper>
      <S.TextBox>
        <S.StatusCode>404</S.StatusCode>

        <S.Text>Oops! This page does not exist.</S.Text>

        <S.Button to="/">Go back</S.Button>
      </S.TextBox>
    </S.Wrapper>
  );
};

export default NotFoundPage;
