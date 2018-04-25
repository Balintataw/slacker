import io from 'socket.io-client'
import store from '../store'
// import jwt from 'jsonwebtoken'
import api from '../lib/api'
// import axios from 'axios'

// const conn = require('../lib/conn')
api.new('/api')

const socket = io.connect('http://localhost:3001')

socket.on('message', data => {
    addMessage(data)
})

export function addMessage(message) {
    store.dispatch({
        type: "ADD_MESSAGE",
        payload: message
    })
}

export function sendMessage(message) {
    socket.emit('message', {
        message: message
    })
}

export function registration(username, password, email, fname, lname, profile_image) {
    console.log('actions line 30 ' + profile_image)
    api.registration(username, password, email, fname, lname, profile_image).then((resp) => {
        // fn('/')
    }).catch(err => {
        store.dispatch({type:"LOGIN_ERROR",payload:err})
        console.log(err)
    })
}

export function login(username, password, fn) {
    console.log(username, password)
    api.login(username, password).then(() => {
        // fn('/')
    }).catch(err => {
        store.dispatch({type:"LOGIN_ERROR",payload:err})
        console.log(err)
    })
}

export function getProfilePage(username) {
    api.get('/profile/' + username).then(resp => {
        store.dispatch({
            type: "GET_PROFILE_PAGE",
            payload: resp.data
        })
    }).catch(err => {
        store.dispatch({type:"LOGIN_ERROR",payload:err})
        console.log(err)
    })
}