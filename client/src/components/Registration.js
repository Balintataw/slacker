import React, { Component } from 'react'
import LeftBar from './LeftBar'
import {registration, addImage} from '../actions/actions'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import './registration.css'

export class Registration extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    fname: '',
    lname: '',
    profile_image: null,
    errorDisplay: 'rgb(62, 165, 62)',
    uploadCloudinaryUrl: '',
    uploadedFile: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  fileChangeHandler = (e) => {
    this.setState({
      profile_image: e.target.files[0]
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.password === this.state.confirmpassword) {
      registration(this.state.username, this.state.password, this.state.email, this.state.fname, this.state.lname, this.state.uploadCloudinaryUrl)
      this.props.history.push('/')
    } else {
      this.setState({
        errorDisplay: 'rgb(182, 32, 32)'
      })
    }
    addImage(this.state.uploadCloudinaryUrl)
  }

  onImageDrop = (files) => {
    this.setState({
      uploadedFile: files[0]
    })
    this.handleImageUpload(files[0])
  }

  handleImageUpload(file) {
    const CLOUDINARY_UPLOAD_PRESET = 'bvidje9n'//'your_upload_preset_id';
    const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/maglingkod/image/upload'                      //'https://api.cloudinary.com/v1_1/your_cloudinary_app_name/upload';
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err)
      }

      if (response.body.secure_url !== '') {
        console.log('resp.body.secure_url ' + response.body.secure_url )
        this.setState({
          uploadCloudinaryUrl: response.body.secure_url
        })
      }
    })
  }
  
  render() {
    return (
      <div className="reg-page-wrapper">
        <LeftBar />
        <div className="form-container-register">
          <h1>Register:</h1>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data" id="reg-page-form">
            <input onChange={this.handleChange} type="text" name="username" placeholder="Username" value={this.state.username} />
            <input onChange={this.handleChange} type="email" name="email" placeholder="Email" value={this.state.email}/>
            <input onChange={this.handleChange} type="text" name="fname" placeholder="First Name" value={this.state.fname}/>
            <input onChange={this.handleChange} type="text" name="lname" placeholder="Last Name" value={this.state.lname}/>
            <input onChange={this.handleChange} type="password" name="password" placeholder="Password" value={this.state.password} style={{background: this.state.errorDisplay}}/>
            <input onChange={this.handleChange} type="password" name="confirmpassword" placeholder="Confirm Password" value={this.state.confirmpassword} style={{background: this.state.errorDisplay}}/>
            <button type="submit" id="reg-btn">Sign Up</button>
            <div className="add-image-container">
              <Dropzone
                multiple={false}
                accept="image/*"
                onDrop={this.onImageDrop}>
                <p>Drop an image or click to select a file to upload.</p>
              </Dropzone>
              <div>
                {this.state.uploadCloudinaryUrl === '' ? null :
                <div>
                  {/* <p>{this.state.uploadedFile.name}</p> */}
                  <img id="upload-img" src={this.state.uploadCloudinaryUrl} alt="upload"/>
                </div>}
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Registration
