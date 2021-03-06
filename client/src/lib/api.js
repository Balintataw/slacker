import axios from 'axios'
import store from '../store'

const instance = axios.create()

instance.tokenPath = '/login'
instance.registerPath = '/registration'
instance.token = window.localStorage.getItem('token') || null

instance.new = function(url = '/') {
  this.defaults.baseURL = url

  if (this.token) {
    this.tokenInterceptor = this.interceptors.request.use(config => {
      config.headers['Authorization'] = 'Bearer ' + this.token
      return config
    })
  }
}

instance.setTokenPath = function(path) {
  this.tokenPath = path
}

instance.getTokenPath = function() {
  return this.tokenPath
}

instance.setRegisterPath = function(path) {
  this.registerPath = path
}

instance.getRegisterPath = function() {
  return this.registerPath
}

instance.login = function (username, password) {
  return this.post(this.getTokenPath(), {username, password})
    .then(resp => {
      window.localStorage.setItem('token', resp.data.token)
      //dispatch token to store / move to index call
      this.tokenInterceptor = this.interceptors.request.use(config => {
        config.headers['Authorization'] = 'Bearer ' + resp.data.token
        return config
      })
      store.dispatch({
        type: "ADD_TOKEN",
        payload:resp.data
      })
    })
}

instance.logout = function() {
  this.token = null
  this.interceptors.request.eject(this.tokenInterceptor)
  this.interceptors.request.eject(this.registerInterceptor)
  window.localStorage.removeItem('token')
}

instance.registration = function (username, password, email, fname, lname, uploadURL) {
  return this.post(this.getRegisterPath(), {username, password, email, fname, lname, uploadURL})
    .then(resp => {
      window.localStorage.setItem('token', resp.data.token)
      //dispatch token to store 
      this.registerInterceptor = this.interceptors.request.use(config => {
        config.headers['Authorization'] = 'Bearer ' + resp.data.token
        return config
      })
      // console.log('registration api ' + resp.data)
      store.dispatch({
        type: "ADD_TOKEN",
        payload:resp.data
      })
  })
}


export default instance