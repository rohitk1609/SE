import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Navbar extends Component {


  logOut(e){
    e.preventDefult()
    localStorage.removeItem()
    

  }



  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    )

    const userLink=(
      <ul className="navbar-nav">
      
      <li className="nav-item">
        <a href="/login" onClick={this.logOut.bind(this)} className="nav-link">
          Logout
        </a>
      </li>
    </ul>
  )
    
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {localStorage.getItem('usertoken')? userLink : loginRegLink}
        </div>
      </nav>
    );
  }
}

