import io from 'socket.io-client'
import store from '../store'

import api from '../lib/api'
api.new('/')

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
    console.log('in actions register function')
    api.registration(username, password).then(() => {          //breaking here
        // fn('/')
    }).catch(err => {
        console.log(err)
    })
}

export function login(username, password, fn) {
    api.login(username, password).then(() => {
        // fn('/')
    }).catch(err => {
        // store.dispatch('login error')
        console.log(err)
    })
}