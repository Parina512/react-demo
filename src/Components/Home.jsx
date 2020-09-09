import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const debounce = (func, delay) => {
  console.log("Inside debounce");
  let timeoutID;
  return function (...args) {
    console.log("Inside debounce's ret func");

    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

class Home extends Component {
  constructor() {
    console.log("====constructor");
    super();
    this.state = {
      search: "",
      stateInfo: {},
    };
  }

  async componentDidMount() {
    this.callFunction("");
  }

  searchAPICall = async (planetName) => {
    console.log("====searchAPICall");
    let urlToCall = `https://swapi.dev/api/planets/?search=${planetName}`;
    const response = await axios.get(urlToCall);

    this.setState({
      stateInfo: response.data,
    });
  };

  callFunction = debounce(this.searchAPICall, 5000);

  handleSearch = (event) => {
    const { name, value } = event.target;

    this.setState(
      {
        [name]: value,
      },
      () => {
        this.callFunction(this.state.search);
      }
    );
  };

  render() {
    console.log("====render");
    if (!this.props.loginState) {
      return <Redirect to="/login"></Redirect>;
    }

    return (
      <div>
        <h1 style={{ color: "green" }}>Hello {this.props.userName},</h1>
        <br />
        <br />
        <input
          name="search"
          value={this.props.search}
          onChange={this.handleSearch}
        />
        <br />
        <br />
        <br />

        {this.state.stateInfo.count ? (
          <div>
            {this.state.stateInfo.results.map((planet) => {
              return (
                <div key={planet.name}>
                  {/* <p>{planet.name}</p> */}
                  <a href={planet.url}>{planet.name}</a>
                </div>
              );
            })}
            <br />
            <br />
          </div>
        ) : null}

        <button onClick={this.props.handleLogout}>Logout</button>
      </div>
    );
  }
}

export default Home;
