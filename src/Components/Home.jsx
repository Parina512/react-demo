import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Modal,
} from "react-bootstrap";

import PlanetCard from "./PlanetCard";

const debounce = (func, delay) => {
  let timeoutID;
  return function (...args) {
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
    super();
    this.state = {
      search: "",
      planetsInfo: {},
      planetDetail: {},
    };
  }

  async componentDidMount() {
    this.searchAPICall("");
  }

  searchAPICall = async (planetName) => {
    let urlToCall = `https://swapi.dev/api/planets/?search=${planetName}`;
    const response = await axios.get(urlToCall);

    this.setState({
      planetsInfo: response.data,
    });
  };

  callFunction = debounce(this.searchAPICall, 3000);

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

  handleLogout = () => {
    localStorage.removeItem("userName");
    this.setState({
      loggedInUserName: "",
    });
  };

  handleplanetsInfo = (planet) => {
    this.setState({ planetDetail: planet });
  };

  handleClose = () => {
    this.setState({ planetDetail: {} });
  };

  render() {
    if (!localStorage.getItem("userName")) {
      return <Redirect to="/login"></Redirect>;
    }

    let totalPopulation = 0;
    let sortedPlanet = [];
    if (this.state.planetsInfo.results) {
      sortedPlanet = [...this.state.planetsInfo.results];

      sortedPlanet.sort((a, b) => {
        if (b.population === a.population) return b.name > a.name ? -1 : 1;
        return Number(b.population) - Number(a.population);
      });

      sortedPlanet.forEach((planet) => {
        if (planet.population !== "unknown") {
          totalPopulation += Number(planet.population);
        }
      });
    }

    return (
      <div>
        <Alert variant="primary">
          <Alert.Heading>
            Hello {localStorage.getItem("userName")},
            <Button
              style={{ float: "right" }}
              onClick={this.handleLogout}
              variant="outline-primary"
            >
              Logout
            </Button>
          </Alert.Heading>
        </Alert>
        <Container>
          <Row>
            <Col></Col>
            <Col md={10}>
              <InputGroup className="mb-3">
                <FormControl
                  name="search"
                  value={this.state.search}
                  onChange={this.handleSearch}
                  placeholder="Search Planets..."
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-primary"
                    onClick={(event) => {
                      let { name, value } = event.target;
                      this.setState({ [name]: value }, () => {
                        this.searchAPICall(this.state.search);
                      });
                    }}
                  >
                    Search
                  </Button>
                </InputGroup.Append>
              </InputGroup>

              {this.state.planetsInfo.count ? (
                <div>
                  {sortedPlanet.map((planet) => {
                    return (
                      <div key={planet.name}>
                        <PlanetCard
                          planet={planet}
                          totalPopulation={totalPopulation}
                          handleplanetsInfo={this.handleplanetsInfo}
                        />
                        <br />
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </Col>
            <Col></Col>
          </Row>
        </Container>
        <Modal show={!!this.state.planetDetail.name} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login State</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <b>Name</b>
              </Col>
              <Col>{this.state.planetDetail.name}</Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <b>Surface Water (in %)</b>
              </Col>
              <Col>{this.state.planetDetail.surface_water}</Col>
            </Row>

            <hr />
            <Row>
              <Col>
                {" "}
                <b>Gravity</b>
              </Col>
              <Col>{this.state.planetDetail.gravity}</Col>
            </Row>

            <hr />
            <Row>
              <Col>
                <b>Orbital Period</b>
              </Col>
              <Col>{this.state.planetDetail.orbital_period}</Col>
            </Row>

            <hr />
            <Row>
              <Col>
                <b>Diameter</b>{" "}
              </Col>
              <Col>{this.state.planetDetail.diameter}</Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <b>Population</b>{" "}
              </Col>
              <Col>{this.state.planetDetail.population}</Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        ;
      </div>
    );
  }
}

export default Home;
