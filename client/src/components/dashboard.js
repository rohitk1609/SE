import React, { Component } from 'react';
// import axios from 'axios';

export default class dashboard extends Component {
    state = {
        user: "",
        
    }
    logOut(e){
        e.preventDefault()
        console.log("yess")
        localStorage.clear()
        console.log(localStorage)
        window.location.href = '/';
        //localStorage.setItem('flag',false)
    
      }

    componentDidMount() {

        const user = localStorage.getItem('user')
        console.log(user)
        this.setState({
            user: user,

        })
    }

    render() {
        return (
            <div >
                <div className="col-md-6 m-auto">
                    <div className="card card-body">
                        <h1 className="text-center mb-3"> Dashboard</h1>

                        <br />
                        <h1 className="lead mb-3">Welcome <span>    </span><strong>{this.state.user}</strong>
                        </h1>
                        <br />
                        <br />
                        {/* <button className="btn btn-danger btn-block" onClick={this.logOut.bind(this)} >Logout </button> */}
                        <a className="btn btn-danger btn-block" href="/register">new form</a>

                    </div>
                </div>

            </div>
        )
    }
}
