import React, { Component } from 'react'
import './registration.css'

export class Registration extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmpassword: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  render() {
    return (
      <div className="reg-page-wrapper">
        <h1>Register:</h1>
        <div className="form-container">
          <form action="/registration" method="POST">
            <input onChange={this.handleChange} type="text" name="username" placeholder="Username" value={this.state.username} />
            <input onChange={this.handleChange} type="email" name="email" placeholder="Email" value={this.state.email}/>
            <input onChange={this.handleChange} type="password" name="password" placeholder="Password" value={this.state.password}/>
            <input onChange={this.handleChange} type="password" name="confirmpassword" placeholder="Confirm Password" value={this.state.confirmpassword}/>
            <button type="submit" id="reg-btn">Sign Up</button>
            <a href=""><button type="button" id="log-btn">Log In</button></a>
          </form>
        </div>
      </div>
    )
  }
}

export default Registration
