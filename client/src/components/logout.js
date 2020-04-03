import React, { Component } from 'react'
import { withRouter,Redirect } from 'react-router-dom'



class logout extends Component {

    componentDidMount() {
        localStorage.clear()
        console.log(localStorage,"yeeee")
    }

  render() {
    return <Redirect to='/'/>    
  }
}

export default withRouter(logout)