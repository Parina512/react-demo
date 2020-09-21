import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  Form,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        password: "",
        userName: "",
      },
      showLoginStatusModal: false,
      errorMessage: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { userName, password } = this.state.formData;

    console.log(this.state.formData);
    let urlToReq = `https://swapi.dev/api/people/?search=${userName}`;

    const response = await axios.get(urlToReq);
    if (response.data.results.length) {
      if (password === response.data.results[0]["birth_year"]) {
        localStorage.setItem("userName", response.data.results[0]["name"]);
        this.setState({
          loggedInUserName: response.data.results[0]["name"],
          errorMessage: "Successfully Logged In.",
        });
      } else {
        this.setState({
          errorMessage: "Password is incorrect",
          showLoginStatusModal: true,
        });
      }
    } else {
      this.setState({
        errorMessage: "User not found",
        showLoginStatusModal: true,
      });
    }
  };

  handleClose = () => {
    this.setState({ showLoginStatusModal: false });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    const { formData } = this.state;
    this.setState({
      formData: { ...formData, [name]: value },
    });
  };

  render() {
    return (
      <div>
        {localStorage.getItem("userName") ? <Redirect to="/"></Redirect> : null}

        <Alert variant="primary">
          <Alert.Heading>Start Wars Demo</Alert.Heading>
        </Alert>
        <Container>
          <Row className="justify-content-md-center">
            <Col></Col>
            <Col>
              <h1>Sign in</h1>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="forUserName">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    name="userName"
                    value={this.state.userName}
                    onChange={this.handleChange}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
        <br />
        <Modal.Dialog style={{ marginTop: "10px" }}>
          <Modal.Header>
            <Modal.Title>Demo Login Credentials</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <b>Username</b>
              </Col>
              <Col>
                <b>Password</b>
              </Col>
            </Row>
            <Row>
              <Col>Luke Skywalker</Col>
              <Col>19BBY</Col>
            </Row>
            <Row>
              <Col>r2</Col>
              <Col>33BBY</Col>
            </Row>
          </Modal.Body>
        </Modal.Dialog>

        <Modal show={this.state.showLoginStatusModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login State</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.errorMessage}</Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Login;
