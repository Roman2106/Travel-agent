import React from "react";
import {withRouter} from "react-router-dom";
import {LoginForm} from "./LoginForm";
import {login} from "../../api/login";

export const Login = withRouter(({history}) => <LoginForm onLoad={loginInfo => {
  login(loginInfo).then(() => {
    history.push("/");
  });
}}
/>);