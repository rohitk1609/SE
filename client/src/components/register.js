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
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Example select</Form.Label>
                <Form.Control as="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Example multiple select</Form.Label>
                <Form.Control as="select" multiple>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group>
            </Form>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  ref="email"
                  className="form-control"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="name"
                  id="name"
                  ref="name"
                  className="form-control"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  ref="password"
                  className="form-control"
                  placeholder="Create Password"
                  required
                />
              </div>
              <div className="dropdown">
                <label>Select role </label>
                <select id="role">
                  <option value="Employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="ceo">CEO</option>
                  required
                </select>
              </div>
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
