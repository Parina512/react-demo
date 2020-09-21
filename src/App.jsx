import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./Components/Login";
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
