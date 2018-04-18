import io from 'socket.io-client'
import store from '../store'

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