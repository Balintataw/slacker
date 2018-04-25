import React, { Component } from 'react'
import {Link, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import api from '../lib/api'
import jwt from 'jsonwebtoken'
import './header.css'

let token = jwt.decode(window.localStorage.getItem('token'))

class Header extends Component {
  static defaultProps = {
    // userData: {}
  }
  handleLogout = (e) => {
    e.preventDefault()
    console.log('log out complete')
    api.logout()
    this.props.history.push('/')
  }
  render() {
    return (
      <div className="header-wrapper">
        <span>{this.props.currentRoom}</span>
        {this.props.isAuthenticated ? 
        <div className="user-info">
          {/* <span>{jwt.decode(window.localStorage.getItem('token')).user}</span> */}
          <span>{this.props.username}</span>
          <img src="http://placehold.it/30/30" id="profile-image" alt=""/>
           <Link to="/" onClick={this.handleLogout}>Logout</Link> 
        </div> : <Link to="/" onClick={this.handleLogout}>Logout</Link>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      username: state.userName,
      isAuthenticated: state.isAuthenticated,
      currentRoom: state.currentRoom
  }
}

export default withRouter(connect(mapStateToProps)(Header))
