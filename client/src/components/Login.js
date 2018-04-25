import React, { Component } from 'react'
import {login} from '../actions/actions'
import {connect} from 'react-redux'
import './login.css'

export class Login extends Component {
  state = {
    username: '',
    email: '',
    password: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.state.username, this.state.password)
  }
  render() {
    return (
      <div className="login-page-wrapper">
        <h1>Login:</h1>
        <div className="log-form-container">
          <form onSubmit={this.handleSubmit} id="log-page-form">
            <input onChange={this.handleChange} type="text" name="username" placeholder="Username" value={this.state.username} />
            {/* <input onChange={this.handleChange} type="email" name="email" placeholder="Email" value={this.state.email}/> */}
            <input onChange={this.handleChange} type="password" name="password" placeholder="Password" value={this.state.password}/>
            <button type="submit" id="login-btn">Log In</button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('login state ' + state)
  return {
    errorMsg : state.loginErrorMsg
  }
}

export default connect(mapStateToProps)(Login)
