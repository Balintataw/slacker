import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Login} from './Login'
import {connect} from 'react-redux'

import './leftbar.css'

class LeftBar extends Component {
  render() {
    return (
      <div className="leftbar-wrapper">
        <Link to='/'><h1 className="logo">Slacker</h1></Link>
        {/* change below to operate off isAuthenticated prop */}
        {window.localStorage.getItem('token') ? <ul className="channel-list">Channels<li>channel1</li></ul> : <div className="login-container"><Login />
        <p>Not already a user?</p><Link to="/registration">Sign up</Link></div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log('left bar state ' + state)
  return {
    errorMsg : state.loginErrorMsg
  }
}

export default connect(mapStateToProps)(LeftBar)
