import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-activity/dist/Dots.css";
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import dotenv from "dotenv";

function App() {
  dotenv.config();

  return (
    <Router>
      <Switch>
        <PublicRoute restricted={false} path="/auth"></PublicRoute>
        <PrivateRoute restricted={true} path="/dashboard"></PrivateRoute>
        <Redirect from="/" to="/auth/login" />
      </Switch>
    </Router>
  );
}

export default App;
