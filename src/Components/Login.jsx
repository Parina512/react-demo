import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log("login page");
    return (
      <div>
        {this.props.loginState ? <Redirect to="/home"></Redirect> : null}

        <form onSubmit={this.props.handleSubmit}>
          <input
            name="userName"
            value={this.props.userName}
            onChange={this.props.handleChange}
          />
          <br />
          <input
            name="password"
            value={this.props.password}
            type="password"
            onChange={this.props.handleChange}
          />
          <br />
          <button>Login</button>
          <h1>{this.props.errorMessage}</h1>
        </form>
      </div>
    );
  }
}

export default Login;
