import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import api from '../lib/api'
import './header.css'

export class Header extends Component {
  handleLogout = (e) => {
    e.preventDefault()
    console.log('logging out')
    api.logout()
  }
  render() {
    return (
      <div className="header-wrapper">
        <span>Date or Room name</span>
        <div className="user-info">
          <span>User Name</span>
          <img src="http://placehold.it/30/30" id="profile-image" alt=""/>
          {window.localStorage.getItem('token') !== null ? <Link to="/" onClick={this.handleLogout}>Logout</Link> : ''}
        </div>
      </div>
    )
  }
}

export default Header
