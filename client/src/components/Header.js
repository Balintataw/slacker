import React, { Component } from 'react'
import './header.css'

export class Header extends Component {
  render() {
    return (
      <div className="header-wrapper">
        <span>Date or Room name</span>
        <div className="user-info">
          <span>User Name</span>
          <img src="http://placehold.it/30/30" id="profile-image" alt=""/>
        </div>
      </div>
    )
  }
}

export default Header
