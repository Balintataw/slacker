import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Login} from './Login'

import './leftbar.css'

export class LeftBar extends Component {
  render() {
    return (
      <div className="leftbar-wrapper">
        <Link to='/'><h1 className="logo">Slacker</h1></Link>
        {/* <Link to="/login">Click to login</Link> */}
        {window.localStorage.getItem('token') ? '' : <Login />}
        <p>Not already a user?</p><Link to="/registration">Sign up</Link>
      </div>
    )
  }
};

export default LeftBar;
