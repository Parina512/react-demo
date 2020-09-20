import React, { Component } from "react";
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
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.loginState ? <Redirect to="/"></Redirect> : null}

        <Alert variant="primary">Start Wars Demo</Alert>
        <Container>
          <Row className="justify-content-md-center">
            <Col></Col>
            <Col>
              <h1>Sign in</h1>
              <Form onSubmit={this.props.handleSubmit}>
                <Form.Group controlId="forUserName">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    name="userName"
                    value={this.props.userName}
                    onChange={this.props.handleChange}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={this.props.password}
                    onChange={this.props.handleChange}
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

        <Modal show={this.props.showModal} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login State</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.errorMessage}</Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Login;
