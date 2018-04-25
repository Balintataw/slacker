import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import api from '../lib/api'
import jwt from 'jsonwebtoken'


import './rightbar.css'

class RightBar extends Component {
  state = {
    rendering: null
  }
  handleChange = (e) => {
    this.setState({
      rendering: false
    })
    this.props.sendRenderState(this.state.rendering)
  }
  handleProfileClick = (e) => {
    e.preventDefault()
    api.profilePage(jwt.decode(window.localStorage.getItem('token')).user)
    this.props.history.push('/profile')
  }
  render() {
    return (
      <div className="rightbar-wrapper">
        <Link to="/profile" >temp profile link</Link>
        <button type="submit" id="close-btn" onClick={this.handleChange}>X</button>
      </div>
    )
  }
};

export default RightBar;
