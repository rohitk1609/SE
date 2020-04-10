import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";
export default class Register extends Component {
  state = {
    isRegistered: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const name = this.refs.name.value;
    const role = this.refs.role.value;
    axios
      .post("http://localhost:8000/register", { email, password, name, role })
      .then((res) => {
        if (res.data) {
          this.setState({
            isRegistered: true,
          });
        }
      })
      .catch((error) => {
        return error.response;
      });
  };

  render() {
    if (this.state.isRegistered) {
      alert("Registration Success");
      alert("Please log in to continue");
      return <Redirect to="/login" />;
    }

    return (
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3">
              <i className="fas fa-user-plus"></i> Register{" "}
            </h1>
            <Form>
              <Form.Group controlId="Email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  ref="email"
                  placeholder="name@example.com"
                  required
                />
              </Form.Group>
              <Form.Group controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" ref="name" required />
              </Form.Group>
              <Form.Group controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref="password" required />
              </Form.Group>
              <Form.Group controlId="select.Role">
                <Form.Label>Select Role</Form.Label>
                <Form.Control as="select" ref="role " required>
                  <option>Employee</option>
                  <option>Manager</option>
                  <option>CEO</option>
                </Form.Control>
              </Form.Group>
            </Form>
            <form onSubmit={this.handleSubmit}>
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            </form>
            <p className="lead mt-4">
              Have An Account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
