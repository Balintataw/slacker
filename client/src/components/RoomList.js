import React, { Component } from 'react'
import {connect} from 'react-redux'
import {joinRoom, createRoom} from '../actions/actions'
import './roomlist.css'

class RoomList extends Component {
    state = {
        roomname: '',
        unreadMsgs: 0
    }
    callRoom = (room) => {
        console.log('joining room ' + JSON.stringify(room))
        joinRoom(room.roomname, room.unreadMsgsCount = 0)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    createRoomSubmit = (e) => {
        e.preventDefault()
        createRoom(this.state.roomname, this.state.unreadMsgs)
        this.setState({
            roomname: '',
        })
    }
    componentWillReceiveProps = () => {

    }
    componentDidUpdate = () => {

    }
    render() {
        return (
        <div className="roomlist-container">
            <form onSubmit={this.createRoomSubmit} id="add-room-form">
                <input type="text" onChange={this.handleChange} placeholder="Create Room" name="roomname" value={this.state.roomname} className="room-input"/>
                <button type="submit" id="add-room-btn">+</button>
            </form>
            <ul>
                {this.props.rooms.map((room,i) => {
                    return <li key={'room' + i} onClick={() => this.callRoom(room)} className={room.roomname === this.props.currentRoom ? 'current' : ''}>
                    {console.log('room data ' + JSON.stringify(room))}
                        {room.roomname}<span className="unread">{room.roomname === this.props.currentRoom ? room.unreadMsgsCount : room.unreadMsgsCount}</span>
                    </li>
                })}

            </ul>
        </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('RoomList ' + typeof state.rooms)
    console.log('Roomlist', state.rooms)
    return {
        messages: state.messages.filter(msg => msg.roomname === state.currentRoom),
        rooms: state.rooms,
        currentRoom: state.currentRoom,
    }
}

export default connect(mapStateToProps)(RoomList)
