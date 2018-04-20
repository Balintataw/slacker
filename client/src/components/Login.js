import React, { Component } from 'react'
import './login.css'

export class Login extends Component {
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
      <div className="login-page-wrapper">
        <h1>Login:</h1>
        <div className="log-form-container">
          <form action="/login" method="POST" id="log-page-form">
            <input onChange={this.handleChange} type="text" name="username" placeholder="Username" value={this.state.username} />
            {/* <input onChange={this.handleChange} type="email" name="email" placeholder="Email" value={this.state.email}/> */}
            <input onChange={this.handleChange} type="password" name="password" placeholder="Password" value={this.state.password}/>
            {/* <input onChange={this.handleChange} type="password" name="confirmpassword" placeholder="Confirm Password" value={this.state.confirmpassword}/> */}
            <button type="submit" id="login-btn">Log In</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
