import React, { Component } from 'react'
import LeftBar from './LeftBar'
import './profile.css'

export class Profile extends Component {
  render() {
    return (
      <div className="profile-container">
        <LeftBar />
        <div className="profile-user-info">
            <a href="#">Edit Profile</a>
            <img src="http://placehold.it/200/200" alt=""/>
            <h1>Username</h1>
            <h3>Actual name</h3>
            <h4>email</h4>
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
      </div>
    )
  }
};

export default Profile;
