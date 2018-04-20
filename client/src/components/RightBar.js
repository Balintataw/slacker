import React, { Component } from 'react'
import {Link} from 'react-router-dom'
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
        <Link to="/profile" >temp profile link</Link>
        <button type="submit" id="close-btn" onClick={this.handleChange}>X</button>
      </div>
    )
  }
};

export default RightBar;
