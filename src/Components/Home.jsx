import React, { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <h1 style={{ color: "green" }}>{this.props.userName}</h1>;
  }
}

export default Home;
