import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import api from '../lib/api'
import jwt from 'jsonwebtoken'
import './header.css'

let token = jwt.decode(window.localStorage.getItem('token'))

export class Header extends Component {
  static defaultProps = {
    userData: {}
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
        <span>Date or Room name</span>
        <div className="user-info">
          <span>{this.props.userData.userName}</span>
          <img src="http://placehold.it/30/30" id="profile-image" alt=""/>
          {window.localStorage.getItem('token') !== null ? <Link to="/" onClick={this.handleLogout}>Logout</Link> : ''}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
      messages: state.messages,
      userData: state.userData
  }
}

export default connect(mapStateToProps)(Header)
