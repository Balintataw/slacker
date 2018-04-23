import io from 'socket.io-client'
import store from '../store'
import jwt from 'jsonwebtoken'

import api from '../lib/api'
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

export function registration(username, password, fn) {
    // console.log('in actions.js registration function')
    // console.log(jwt.decode(window.localStorage.getItem('token')))
    api.registration(username, password).then(() => {
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