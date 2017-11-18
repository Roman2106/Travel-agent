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
        <form onSubmit={e => {
          e.preventDefault();
          this.props.onLogin({
            login: this.state.login,
            password: this.state.password
          })
        }}>
          <p>
            <label htmlFor="login">Login:</label>
            <input type="text" name="login" id="login" title="login"
                   onChange={e => this.setState({login: e.target.value})}
                   value={this.state.login}
            />
          </p>
          <p>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" title="password"
                   onChange={e => this.setState({password: e.target.value})}
                   value={this.state.password}
            />
          </p>
          <button className="loginFormSend" type="submit">Send</button>
        </form>
      </div>
    )
  }

}