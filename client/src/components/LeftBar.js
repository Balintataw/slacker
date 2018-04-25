import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Login} from './Login'
import {connect} from 'react-redux'
import RoomList from './RoomList'

import './leftbar.css'

class LeftBar extends Component {
  render() {
    return (
      <div className="leftbar-wrapper">
        <Link to='/'><h1 className="logo">Slacker</h1></Link>
        {/* change below to operate off isAuthenticated prop */}
        {this.props.isAuthenticated ? <RoomList /> : <div className="login-container"><Login />
        <p>Not already a user?</p><Link to="/registration">Sign up</Link></div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log('left bar state ' + state)
  return {
    errorMsg : state.loginErrorMsg,
    isAuthenticated: state.isAuthenticated
  }
}

export default connect(mapStateToProps)(LeftBar)
