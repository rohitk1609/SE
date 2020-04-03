import React, { Component } from 'react';
import Welcome from './components/welcome';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Register from './components/register';
import form from './components/form';
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";



export default class App extends Component {

flag = false

  render() {
    console.log(localStorage)
    this.flag = localStorage.getItem("flag");
    return (
      <React.Fragment>
          <Router>
        <div className="App">
          <Navbar  auth={this.flag}/>
          <div className="container">
          {/* <Route path="/" component={Welcome} /> */}
          <Route path="/form" component={form} />
          <Route path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/Dashboard" component={Dashboard} />
          </div>
        </div>
      </Router>
      
      </React.Fragment>
     );
  }
}


