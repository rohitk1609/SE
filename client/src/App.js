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

state = {
  flag: false
}

// componentDidMount() {

//   //const user = localStorage.getItem('user')
//   this.setState({
//     flag: localStorage.getItem("flag"),
//   })
// }

  render() {
    console.log(localStorage)
    
    
    console.log(this.flag)
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


