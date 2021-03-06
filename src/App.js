import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Users from "./Pages/Users";
import Profile from "./Pages/Profile";

function App() {
  return (
    <div>
      <Router>
          <Switch>
            <Route exact path="/" children={<Users />} />
            <Route path="/profile/:id" children={<Profile />} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
