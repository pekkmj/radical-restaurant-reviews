import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import "../assets/scss/main.scss";

import getCurrentUser from "../services/getCurrentUser.js";
import RegistrationForm from "./registration/RegistrationForm.js";
import SignInForm from "./authentication/SignInForm.js";
import TopBar from "./layout/TopBar.js";
import RestaurantList from "./RestaurantList.js";
import RestaurantShow from "./RestaurantShow.js";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <h2>Hello from react</h2>
        </Route>
        <Route exact path="/restaurants" component={RestaurantList} />
        <Route exact path="/restaurants/:id" component={RestaurantShow} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  );
};

export default hot(App);
