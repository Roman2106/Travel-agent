import React from "react";
import {withRouter} from "react-router-dom";
import {LoginForm} from "./LoginForm";
import {login} from "../../api/login";
import Alert from "../Commons/Alerts/Alert.js";

export const Login = withRouter(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        errorMessage: ""
      }
    }

    onLogin = (loginInfo) => {
      login(loginInfo).then(() => {
        this.props.history.push("/");
      }).catch(error => {
        this.setState({
          errorMessage: error.message
        })
      });
    };

    render() {
      return (
        <div className="wrapperLogin">
          {this.state.errorMessage ? <Alert
            hideAfter={3}
            type={"danger"}
            text={this.state.errorMessage}
            delMessage={()=>{}}
          /> : null}
          <LoginForm onLogin={this.onLogin}/>
        </div>
      )
    }
  });
