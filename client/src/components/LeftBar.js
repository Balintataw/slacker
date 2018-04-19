import React, { Component } from 'react';
import './leftbar.css'

export class LeftBar extends Component {
  render() {
    return (
      <div className="leftbar-wrapper">
        <p>left bar</p>
        <a href="/registration">Register here</a>
      </div>
    )
  }
};

export default LeftBar;
