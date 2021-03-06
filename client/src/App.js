import React, { Component } from 'react';
import Welcome from './components/welcome';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Register from './components/register';
import FormBuilder from './components/form';
import formdetails from './components/form_req';
import logout from './components/logout';
import Float from './components/float';
import Viewing from './components/viewing';
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route , Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import Workflow from './components/workflow'

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
          <Route exact path="/workflow" component={Workflow} />
          <Route exact path="/" component={Welcome} />
          <Route exact path="/form" component={FormBuilder} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/formdetails" component={formdetails}/>
          <Route exact path="/logout" component={logout} />
          <Route exact path="/float" component={Float} />
          <Route exact path="/viewing" component={Viewing} />
               </Switch>
          
          </div>
        </div>
      </Router>
      
      </React.Fragment>
     );
  }
}


