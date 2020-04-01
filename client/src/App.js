import React, { Component } from 'react';
import Header from "./components/header";
import Footer from "./components/footer";
import Welcome from './components/welcome';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Register from './components/register';
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Switch} from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <React.Fragment>
          <Router>
        <div className="App">
          <Navbar />
          <br />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/Dashboard" component={Dashboard} />
        </div>
      </Router>
      
      </React.Fragment>
     );
  }
}


