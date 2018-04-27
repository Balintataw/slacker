import io from 'socket.io-client'
import store from '../store'
import api from '../lib/api'

api.new('/api')

// const socket = io.connect('http://localhost:3001') //change this to connect elsewhere
// const socket = io.connect('http://10.68.0.239:3001')
const socket = io.connect('http://192.168.50.34:3001')

socket.emit('join', {room: store.getState().currentRoom})

socket.on('message', data => {
    addMessage(data)
})

socket.on('update rooms', rooms => {
    updateRooms(rooms)
})

export function joinRoom(roomname, unreadMsgsCount) {
    const room = {
        roomname: roomname,
        unreadMsgsCount: unreadMsgsCount
    }
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
    const roomname = store.getState().currentRoom
    const timestamp = new Date()
    const profile_image = store.getState().profile_image
    
    socket.emit('message', {
        username: username,
        message: message,
        roomname: roomname,
        timestamp: timestamp,
        profile_image: profile_image
    })
}

export function updateRooms(rooms) {
    store.dispatch({
        type: "UPDATE_ROOMS",
        payload: rooms
    })
}

export function createRoom(roomname, unreadMsgsCount) {
    socket.emit('create room', {roomname: roomname, unreadMsgsCount: unreadMsgsCount})
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

export function addImage(url) {
  store.dispatch({
      type: "ADD_IMAGE_URL",
      payload: url
  })  
}

export function logoutUser() {
    store.dispatch({
        type: "LOGOUT",
        payload: ''
    })
}