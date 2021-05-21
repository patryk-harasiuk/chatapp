import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import LoadingAnimation from "../LoadingAnimation";
import * as S from "./RegisterPageStyles";

const RegisterPage = () => {
  const [registerState, setRegisterState] = useState({
    username: "",
    password: "",
    email: "",
    loading: false,
  });

  const [error, setError] = useState({});
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    setRegisterState({ ...registerState, loading: true });
    setError({});

    axios
      .post("/register", {
        username: registerState.username,
        password: registerState.password,
        email: registerState.email,
      })
      .then((response) => {
        setRegisterState({ ...registerState, loading: false });
        setError({});
        history.push("/login");
      })
      .catch((error) => {
        setRegisterState({ ...registerState, loading: false });
        setError(error.response.data);
      });
  };

  if (registerState.loading) {
    return <LoadingAnimation></LoadingAnimation>;
  }

  return (
    <S.RegisterWrapper>
      <S.RegisterForm onSubmit={submitHandler}>
        <S.RegisterHeading>Create your account!</S.RegisterHeading>
        <S.InputBox>
          <S.Input
            autoComplete="off"
            required="required"
            type="text"
            name="username"
            value={registerState.username}
            onChange={(e) =>
              setRegisterState({ ...registerState, username: e.target.value })
            }
          />
          {error.path === "username" ? (
            <S.ErrorInfo>{error.errorMessage}</S.ErrorInfo>
          ) : null}
          <S.Label htmlFor="username">Username</S.Label>
        </S.InputBox>

        <S.InputBox>
          <S.Input
            autoComplete="off"
            required="required"
            type="password"
            name="password"
            value={registerState.password}
            onChange={(e) =>
              setRegisterState({ ...registerState, password: e.target.value })
            }
          />
          {error.path === "password" ? (
            <S.ErrorInfo>{error.errorMessage}</S.ErrorInfo>
          ) : null}
          <S.Label htmlFor="password">Password</S.Label>
        </S.InputBox>

        <S.InputBox>
          <S.Input
            autoComplete="off"
            required="required"
            type="text"
            name="e-mail"
            value={registerState.email}
            onChange={(e) =>
              setRegisterState({ ...registerState, email: e.target.value })
            }
          />
          {error.path === "email" ? (
            <S.ErrorInfo>{error.errorMessage}</S.ErrorInfo>
          ) : null}
          <S.Label htmlFor="e-mail">Email</S.Label>
        </S.InputBox>
        <S.ButtonSingUp type="submit">Sign up</S.ButtonSingUp>
        <S.Login>
          Already have an account? <S.LoginLink to="/login">Log in</S.LoginLink>
        </S.Login>
      </S.RegisterForm>
    </S.RegisterWrapper>
  );
};

export default RegisterPage;
