import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import api from '../lib/api'
import {logoutUser} from '../actions/actions'
import './header.css'

// let token = jwt.decode(window.localStorage.getItem('token'))

class Header extends Component {
  state = {
    date: ''
  }

  handleLogout = (e) => {
    e.preventDefault()
    console.log('log out complete')
    api.logout()
    logoutUser()
    this.props.history.push('/')
  }
  componentDidMount = () => {
    const reg = /(\w+\s\w+\s\d+)/
    const regDate = new Date().toString().match(reg)
    this.setState({
      date: regDate[0]
    })
  }
  render() {
    return (
      <div className="header-wrapper">
        {this.props.isAuthenticated ?
        <div className="header-inner-wrapper">
          <span>You are in: {this.props.currentRoom}</span><span>{this.state.date}</span>
          <div className="user-info">
            <span>{this.props.username}</span>
            <Link to="/profile"><img src={this.props.profile_image} id="profile-image" alt=""/></Link>
            <Link to="/" onClick={this.handleLogout}>Logout</Link> 
          </div>
        </div> : <div>{this.state.date}</div>}
        
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      username: state.userName,
      isAuthenticated: state.isAuthenticated,
      currentRoom: state.currentRoom,
      profile_image: state.profile_image
  }
}

export default withRouter(connect(mapStateToProps)(Header))
