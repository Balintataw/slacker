import io from 'socket.io-client'
import store from '../store'
import api from '../lib/api'

api.new('/api')

const socket = io.connect('http://localhost:3001') //change this to connect elsewhere
// const socket = io.connect('http://70.180.192.241:3001')

socket.emit('join', {room: store.getState().currentRoom})

socket.on('message', data => {
    addMessage(data)
})

socket.on('update rooms', rooms => {
    updateRooms(rooms)
})

export function joinRoom(room) {
    store.dispatch({
        type: "JOIN_ROOM",
        payload: room
    })
}

export function addMessage(message) {
    store.dispatch({
        type: "ADD_MESSAGE",
        payload: message
    })
}

export function sendMessage(message) {
    const username = store.getState().userName
    const roomname = store.getState().roomName
    socket.emit('message', {
        username: username,
        message: message,
        roomname: roomname
    })
}

export function updateRooms(rooms) {
    store.dispatch({
        type: "UPDATE_ROOMS",
        payload: rooms
    })
}

export function createRoom(room) {
    socket.emit('create room', room)
}

export function registration(username, password, email, fname, lname, profile_image) {
    api.registration(username, password, email, fname, lname, profile_image).then((resp) => {
        // fn('/')
    }).catch(err => {
        store.dispatch({type:"LOGIN_ERROR",payload:err})
        console.log(err)
    })
}

export function login(username, password, fn) {
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