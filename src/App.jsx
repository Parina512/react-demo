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
      userName: localStorage.getItem("userName") || "",
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
        localStorage.setItem("userName", userName);
        this.setState({ errorMessage: "Successfully Logged In." });
        this.setState({ loginState: true });
      } else {
        this.setState({ errorMessage: "Password is incorrect" });
      }
    } else {
      this.setState({ errorMessage: "User not found" });
    }
  };

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/home">
              <Home userName={this.state.userName} />
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
