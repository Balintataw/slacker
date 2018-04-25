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
    lname: '',
    profile_image: null,
    errorDisplay: 'rgb(62, 165, 62)'
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  fileChangeHandler = (e) => {
    this.setState({
      profile_image: e.target.files[0]
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.password === this.state.confirmpassword) {
      const formData = new FormData()
      // formData.append('profile_image', this.state.profile_image, this.state.profile_image.name)
      // console.log('onsubmit ' + this.state.profile_image)
      registration(this.state.username, this.state.password, this.state.email, this.state.fname, this.state.lname, formData)
      this.props.history.push('/')
    } else {
      this.setState({
        errorDisplay: 'rgb(182, 32, 32)'
      })
    }
  }
  render() {
    return (
      <div className="reg-page-wrapper">
        <LeftBar />
        <div className="form-container-register">
          <h1>Register:</h1>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data" id="reg-page-form">
            <input onChange={this.handleChange} type="text" name="username" placeholder="Username" value={this.state.username} />
            <input onChange={this.handleChange} type="email" name="email" placeholder="Email" value={this.state.email}/>
            <input onChange={this.handleChange} type="text" name="fname" placeholder="First Name" value={this.state.fname}/>
            <input onChange={this.handleChange} type="text" name="lname" placeholder="Last Name" value={this.state.lname}/>
            <input onChange={this.handleChange} type="password" name="password" placeholder="Password" value={this.state.password} style={{background: this.state.errorDisplay}}/>
            <input onChange={this.handleChange} type="password" name="confirmpassword" placeholder="Confirm Password" value={this.state.confirmpassword} style={{background: this.state.errorDisplay}}/>
            <input type="file" onChange={this.fileChangeHandler} name="picture" />
            {/* <span className="login-message">Already a user?</span> */}
            <button type="submit" id="reg-btn">Sign Up</button>
            {/* <a href=""><button type="button" id="log-btn">Log In</button></a> remove css*/}
          </form>
        </div>
      </div>
    )
  }
}

export default Registration
