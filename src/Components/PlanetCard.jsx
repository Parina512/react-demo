import React from "react";
import { Button, Card, ProgressBar } from "react-bootstrap";

function PlanetCard(props) {
  let planetPopulation =
    props.planet.population !== "unknown" ? props.planet.population : 0;
  let populationByCent = planetPopulation
    ? ((planetPopulation * 100) / props.totalPopulation).toFixed(6)
    : (0).toFixed(6);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.planet.name}</Card.Title>
        <Card.Text>
          <b>{props.planet.name}</b> is made of mostly{" "}
          <b>{props.planet.terrain}</b> and has gravity of{" "}
          <b>{props.planet.gravity}</b>.<br />
          It has population of <b>{planetPopulation}</b> which is{" "}
          <b>{populationByCent}</b>% of total population from current list.
        </Card.Text>
        <ProgressBar
          style={{ marginBottom: "10px" }}
          now={populationByCent}
          label={`${populationByCent}%`}
          srOnly
        />
        <Button
          variant="info"
          onClick={(event) => {
            props.handleplanetsInfo(props.planet);
          }}
        >
          Explore Planet
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PlanetCard;
