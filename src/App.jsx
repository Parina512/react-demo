import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import axios from "axios";

import Login from "./Components/Login";
import Home from "./Components/Home";
import Header from "./Components/Header";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loginState: localStorage.getItem("userName") ? true : false,
      errorMessage: "",
      password: "",
      userName: "",
      loggedInUserName: localStorage.getItem("userName") || "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { userName, password } = this.state;

    let urlToReq = `https://swapi.dev/api/people/?search=${userName}`;

    const response = await axios.get(urlToReq);
    if (response.data.results.length) {
      if (password === response.data.results[0]["birth_year"]) {
        localStorage.setItem("userName", response.data.results[0]["name"]);
        this.setState({
          loggedInUserName: response.data.results[0]["name"],
          errorMessage: "Successfully Logged In.",
          loginState: true,
        });
      } else {
        this.setState({ errorMessage: "Password is incorrect" });
      }
    } else {
      this.setState({ errorMessage: "User not found" });
    }
    alert(this.state.errorMessage);
  };

  handleLogout = () => {
    localStorage.removeItem("userName");
    this.setState({
      loginState: false,
      errorMessage: "",
      userName: "",
      password: "",
      loggedInUserName: "",
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Home
                userName={this.state.loggedInUserName}
                handleLogout={this.handleLogout}
                loginState={this.state.loginState}
              />
            </Route>
            <Route path="/login">
              <Login
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                userName={this.state.userName}
                password={this.state.password}
                errorMessage={this.state.errorMessage}
                loginState={this.state.loginState}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
