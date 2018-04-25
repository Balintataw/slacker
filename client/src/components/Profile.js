import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import LeftBar from './LeftBar'
// import {getProfilePage} from '../actions/actions'
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
  componentDidMount = () => {
    // getProfilePage(this.props.userData.userName)
  }
  render() {
    return (
      <div>
      {this.props.isAuthenticated ? 
      <div className="profile-container">
        <LeftBar />
        <div className="profile-user-info">
            <Link to="#">Edit Profile</Link>
            <img src="http://placehold.it/200/200" alt=""/>
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
  console.log(state)
  return {
      username: state.userName,
      isAuthenticated: state.isAuthenticated,
      fname: state.fname,
      lname: state.lname,
      email: state.email
  }
}

export default connect(mapStateToProps)(Profile)
