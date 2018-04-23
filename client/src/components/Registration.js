import React, { Component } from 'react'
import LeftBar from './LeftBar'
import {registration} from '../actions/actions'
import './registration.css'

export class Registration extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    fname: '',
    lname: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    registration(this.state.username, this.state.password)
    console.log(this.props.history.goBack())
  }
  render() {
    return (
      <div className="reg-page-wrapper">
        <LeftBar />
        <div className="form-container-register">
          <h1>Register:</h1>
          <form onSubmit={this.handleSubmit} id="reg-page-form">
            <input onChange={this.handleChange} type="text" name="username" placeholder="Username" value={this.state.username} />
            <input onChange={this.handleChange} type="email" name="email" placeholder="Email" value={this.state.email}/>
            <input onChange={this.handleChange} type="text" name="fname" placeholder="First Name" value={this.state.fname}/>
            <input onChange={this.handleChange} type="text" name="lname" placeholder="Last Name" value={this.state.lname}/>
            <input onChange={this.handleChange} type="password" name="password" placeholder="Password" value={this.state.password}/>
            <input onChange={this.handleChange} type="password" name="confirmpassword" placeholder="Confirm Password" value={this.state.confirmpassword}/>
            <span className="login-message">Already a user?</span>
            <button type="submit" id="reg-btn">Sign Up</button>
            <a href=""><button type="button" id="log-btn">Log In</button></a>
          </form>
        </div>
      </div>
    )
  }
}

export default Registration
