import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import LeftBar from './LeftBar'
import './profile.css'

export class Profile extends Component {
  static defaultProps = {
    profileData: {
      username: '',
      fname: '',
      lname: '',
      email: '',
      profile_image: ''
    }
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? 
        <div className="profile-container">
        <LeftBar />
          <div className="profile-user-info">
            <Link to="#">Edit Profile</Link>
            <img src={this.props.profile_image} alt="profile"/>
            <h1>{this.props.username}</h1>
            <h3>{this.props.fname + ' ' + this.props.lname}</h3>
            <h4>{this.props.email}</h4>
            <p>bio thing</p>
          </div>
          <div className="profile-user-contacts">
            <ul>Friends
                <li>friend 1</li>
                <li>friend 2</li>
            </ul>
            <ul>Recent Posts
                <li>post 1</li>
                <li>post 2</li>
            </ul>
          </div>
        </div> : <Redirect to='/' />}
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
      username: state.userName,
      isAuthenticated: state.isAuthenticated,
      fname: state.fname,
      lname: state.lname,
      email: state.email,
      profile_image: state.profile_image
  }
}

export default connect(mapStateToProps)(Profile)
