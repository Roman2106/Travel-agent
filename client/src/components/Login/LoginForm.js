import React from "react";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: ""
    }
  }

  render() {
    return (
      <div className="containerLoginForm">
        <h1>Welcome to Travel-agent </h1>
        <form onSubmit={e => {
          e.preventDefault();
            this.props.onLogin({
              login: this.state.login,
              password: this.state.password
            })
        }}>
          <label htmlFor="login">Login:</label>
          <input type="text" name="login" id="login" title="login" value={this.state.login}
                 onChange={e => this.setState({login: e.target.value})}
          />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" title="password" value={this.state.password}
                 onChange={e => this.setState({password: e.target.value})}
          />
          <button className="loginFormSend" type="submit">Send</button>
        </form>
      </div>
    )
  }

}