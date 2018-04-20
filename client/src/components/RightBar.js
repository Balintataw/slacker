import React, { Component } from 'react';
import './rightbar.css'

export class RightBar extends Component {
  state = {
    rendering: null
  }
  handleChange = (e) => {
    this.setState({
      rendering: false
    })
    this.props.sendRenderState(this.state.rendering)
  }
  render() {
    return (
      <div className="rightbar-wrapper">
        <p>right bar</p>
        <button type="submit" onClick={this.handleChange}>X</button>
      </div>
    )
  }
};

export default RightBar;
