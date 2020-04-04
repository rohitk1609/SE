import React, { Component } from 'react';
import Welcome from './components/welcome';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Register from './components/register';
import form from './components/form';

import logout from './components/logout';
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route , Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";



export default class App extends Component {

state = {
  flag: false
}

  render() {
    console.log(localStorage)
    console.log(this.flag)
    return (
      <React.Fragment>
          <Router>
        <div className="App">
          <Navbar  auth={this.flag}/>
          <div className="container">
          <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/form" component={form} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/logout" component={logout} />
               </Switch>
          
          </div>
        </div>
      </Router>
      
      </React.Fragment>
     );
  }
}


